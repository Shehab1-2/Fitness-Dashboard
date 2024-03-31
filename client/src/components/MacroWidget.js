import React, { useState, useEffect } from 'react';

const MacroWidget = ({ user }) => {
    const [macros, setMacros] = useState({ protein: 0, carbs: 0, fats: 0 });

    const calculateMacros = () => {
        // Assuming we have user data with weight (kg), height (cm), age, gender, fitnessGoal
        const { weight, fitnessGoals } = user;

        let protein = 0;
        let carbs = 0;
        let fats = 0;

        // Simple logic to determine macros, real calculations would be more complex
        if (fitnessGoals === 'gain muscle') {
            protein = weight * 2.2; // 2.2 grams per kg of body weight
            carbs = weight * 4; // 4 grams per kg of body weight
            fats = weight * 1; // 1 gram per kg of body weight
        } else if (fitnessGoals === 'lose weight') {
            protein = weight * 1.8; // 1.8 grams per kg of body weight
            carbs = weight * 2; // 2 grams per kg of body weight
            fats = weight * 0.8; // 0.8 grams per kg of body weight
        } else if (fitnessGoals === 'improve stamina') {
            protein = weight * 1.5; // 1.5 grams per kg of body weight
            carbs = weight * 3; // 3 grams per kg of body weight
            fats = weight * 0.9; // 0.9 grams per kg of body weight
        }

        return { protein, carbs, fats };
    }

    useEffect(() => {
        setMacros(calculateMacros());
    }, [user]);

    return (
        <div className="widget macro-widget">
            <h2>Macro Goals</h2>
            <p>Protein: {macros.protein}g</p>
            <p>Carbs: {macros.carbs}g</p>
            <p>Fats: {macros.fats}g</p>
        </div>
    );
}

export default MacroWidget;
