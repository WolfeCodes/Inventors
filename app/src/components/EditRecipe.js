import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const EditRecipe = () => {
    const {recipeId} = useParams();
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [ingredientsList, setIngredientsList] = useState([]);
    const [ingrAmount, setIngrAmount] = useState(0);
    const [ingrUnit, setIngrUnit] = useState("");
    const [ingredientInput, setIngredientInput] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        fetchRecipe();
    }, []);

    const fetchRecipe = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/recipes/" + recipeId);
            const recipeData = await response.json();
            setName(recipeData.name);
            setDescription(recipeData.description);
            console.log(recipeData.ingr);
            setIngredientsList(recipeData.ingr);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching recipe:", error);
            setErrorMessage("Error fetching recipe. Please try again later.");
        }
    };

    const handleIngredientChange = (e) => {
        setIngredientInput(e.target.value);
    };

    const handleAddIngredient = () => {
        if (ingredientInput !== "") {
            let newIngredient = `${ingrAmount} ${ingrUnit} ${ingredientInput}`;
            setIngredientsList([...ingredientsList, newIngredient]);
            setIngredientInput("");
        }
    };

    const handleRemoveIngredient = (target) => {
        setIngredientsList(ingredientsList.filter((ingredient) => ingredient !== target));
    };

    const handleSaveChanges = () => {
        if (name.trim() === '' || description.trim() === '' || ingredientsList.length === 0) {
            setErrorMessage('Please fill in all fields before saving the recipe');
            return;
        }

        const updatedRecipeData = {
            name: name,
            description: description,
            ingr: ingredientsList,
        };

        fetch("http://localhost:8080/api/recipes/" + recipeId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedRecipeData),
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Failed to update recipe');
            }
            setSuccessMessage('Recipe updated successfully!');
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        }).catch((error) => {
            console.error('Error updating recipe:', error.message);
            setErrorMessage('Error updating recipe. Please try again later.');
        });
    };

    if(loading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    } else {
        return (
            <div>
              <h2>Edit Recipe</h2>
              {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
              {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
              <form>
                <label>
                  Recipe Name:
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <br />
                <label>
                  Description:
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>
                <br />
                    {ingredientsList.map((ingredient, index) => (
                        <div key={index}>{ingredient}</div>
                    ))}

                <label>
                  <input type='number' value={ingrAmount} onChange={(e) => setIngrAmount(e.target.value)} />
                  <select onChange={(e) => setIngrUnit(e.target.value)}>
                    <option value=" "> </option>
                    <option value="grams">grams</option>
                    <option value="oz">oz</option>
                    <option value="lbs">lbs</option>
                    <option value="serving">serving</option>
                  </select>
                  <input type="text" value={ingredientInput} onChange={handleIngredientChange} />
                  <Button variant='primary' onClick={handleAddIngredient}>Add Ingredient</Button>
                </label>
                <br />
                <p><Button variant='success' onClick={handleSaveChanges}>Save Changes</Button></p>
              </form>
            </div>
          );

    }
};

export default EditRecipe;