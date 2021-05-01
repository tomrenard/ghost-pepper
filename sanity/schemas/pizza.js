import { MdLocalPizza as icon } from 'react-icons/md';
import PriceInput from '../components/PriceInput';

export default {
  name: 'pizza',
  title: 'Pizzas',
  type: 'document',
  icon: icon,
  fields: [
    {
      name: 'name',
      title: 'Pizza name',
      type: 'string',
      description: 'Name of the pizza',
    },
    {
      name: 'slug',
      title: 'slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLenght: 100,
      },
    },
    {
      name: 'image',
      title: 'Pizzas image',
      type: 'image',
      options: {
        hotspot: true
      },
    },
    {
      name: 'price',
      title: 'Pizzas price',
      inputComponent: PriceInput,
      type: 'number',
      description: 'Price of the pizza in cents',
      validation: Rule => Rule.min(1000),
    },
     {
      name: 'toppings',
      title: 'Toppings',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'topping'}]}]
    },
  ],
  preview: {
    select: {
      name: 'name',
      topping0: 'toppings.0.name',
      topping1: 'toppings.1.name',
      topping2: 'toppings.2.name',
      topping3: 'toppings.3.name',
      media: 'image',
    },
    prepare: ({name, media, ...toppings}) => {
      const tops = Object.values(toppings).filter(top => top !== undefined);
      return { title: name,
        media,
        subtitle: tops.join(', '),
      };
    }
  }
};
