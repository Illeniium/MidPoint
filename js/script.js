const handleMidPoint = () => {

    // VARIABLES
    let table = "";
    
    //  GET VALUES OF THE FORM 
    const higher = document.getElementById('higher').value;
    const lower = document.getElementById('lower').value;
    const objective = document.getElementById('objective').value;
    const error = document.getElementById('error').value;

    // VALIDATION OF THE VALUES 
    if ( higher === '' && lower === '' && objective === '' && error === '' ) {
        return Swal.fire({
            icon: 'error',
            title: 'Error en los campos.',
            text: 'Todos los campos son necesario!'
        });
    } else if ( parseFloat(lower) > parseFloat(higher) ) {
        return Swal.fire({
            icon: 'error',
            title: 'Error de comparacion',
            text: 'El punto inferior no puede ser mayor al superior!'
        });
    } else if ( parseFloat(objective) > parseFloat(higher) ){
        return Swal.fire({
            icon: 'error',
            title: 'Error de comparacion',
            text: 'El objetivo no puede ser mayor al punto superior!'
        });
    } else if ( parseFloat(objective) < parseFloat(lower) ){
        return Swal.fire({
            icon: 'error',
            title: 'Error de comparacion',
            text: 'El objetivo no puede ser menor al punto inferior!'
        });
    } 
    
    // MAPING TABLE
    arrayIterations( parseFloat(higher), parseFloat(lower), parseFloat(objective), parseFloat(error) ).map( (item, index) => 
        table += `
            <tr>
                <td class = "px-6 py-4 whitespace-nowrap" >${ index }</th>
                <td class = "px-6 py-4 whitespace-nowrap" >${ item.higher }</td>
                <td class = "px-6 py-4 whitespace-nowrap" >${ item.lower }</td>
                <td class = "px-6 py-4 whitespace-nowrap" >( ${ item.higher } + ${ item.lower } ) / 2 = ${ item.midpoint }</td>
            </tr>
        `
    );

    // SET OBTAINED VALUES
    document.getElementById('tbody').innerHTML = table;
    document.getElementById('errorRange').innerHTML = ( parseFloat(error) === 0 ) ? `No hay margen de error, el objectivo es ${ objective }` : `
        Margen de error: mayor a ${ parseFloat(objective) - parseFloat(error) } menor a ${ parseFloat(objective) + parseFloat(error) }
    `;
    document.getElementById('successions').innerHTML = `Numero de recorridos: 
        ${ arrayIterations( parseFloat(higher), parseFloat(lower), parseFloat(objective), parseFloat(error) ).length }
    `;

    // MESSAGE SUCCESS
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
      
    Toast.fire({
        icon: 'success',
        title: 'Resultados encotrados deslise hacia abajo :)!'
    })

}

const arrayIterations = ( higher, lower, objective, error ) => {
    let array = [];

    while (true) {

        let midpoint = parseFloat( ( higher + lower ) / 2 );
        
        array = [...array, { higher: higher, lower: lower, midpoint: midpoint }];

        if ( midpoint >= ( objective - error ) && midpoint <=  ( objective + error ) || midpoint === objective ) return array;

        ( midpoint < objective ) ? lower = midpoint : higher = midpoint;

    }
}


