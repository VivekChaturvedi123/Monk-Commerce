import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import DraggableProductItem from './DraggableProductItem';

const ParentComponent = () => {
    const [products, setProducts] = useState([]);

    const addProduct = () => {
        const newProduct = {
            id: Date.now(), 
            name: "New Product", 
            price: 0,
        };
        console.log("Adding product:", newProduct);
        setProducts((prevProducts) => [...prevProducts, newProduct]);
    };

    const onRemove = (id) => {
        setProducts((prevProducts) => prevProducts.filter(product => product.id !== id));
    };

    const onEdit = (id, updatedProduct) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) => (product.id === id ? updatedProduct : product))
        );
    };

    return (
        <div>
            <button onClick={addProduct}>Add Product</button>
            <Droppable droppableId="droppable">
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {products.map((product, index) => (
                            <DraggableProductItem
                                key={product.id}
                                product={product}
                                index={index}
                                onRemove={onRemove}
                                onEdit={onEdit}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default ParentComponent;
