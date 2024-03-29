import React from 'react';
import './MacronutrientGoalsWidget.css';

const MacronutrientGoalsWidget = ({ username }) => {
  // Dummy macronutrient goals
  const macros = {
    proteins: '150g',
    fats: '70g',
    carbohydrates: '300g'
  };

  return (
    <div className="macronutrient-goals-widget">
      <h3>Macronutrient Goals</h3>
      <p>Proteins: {macros.proteins}</p>
      <p>Fats: {macros.fats}</p>
      <p>Carbohydrates: {macros.carbohydrates}</p>
    </div>
  );
};

export default MacronutrientGoalsWidget;
