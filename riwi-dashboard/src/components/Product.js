function Product ({id, name, info, price, subcategory, size}) {
    return (
        <tr>
                    <th scope="row">{id}</th>
                    <td>{name}</td>
                    <td>{info}</td>
                    <td>{price}</td>
                    <td>{subcategory}</td>
                    <td>{size}</td>
                    </tr>
    )
}

export default Product