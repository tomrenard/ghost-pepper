import { FaPepperHot as icon } from 'react-icons/fa';

export default {
  name: 'topping',
  title: 'Toppings',
  type: 'document',
  icon: icon,
  fields: [
    {
      name: 'name',
      title: 'Topping name',
      type: 'string',
      description: 'Name of the topping',
    },
    {
      name: 'vegetarian',
      title: 'Vegetarian',
      type: 'boolean',
      description: 'Vege or not',
      options: {
        layout: 'checkbox',
      }
    },
  ],
  preview: {
    select: {
      name: 'name',
      vegetarian: 'vegetarian',
    },
    prepare: fields => ({
      title: `${fields.name} ${fields.vegetarian ? '🥬' : ''}`,
    }),
  }
};
