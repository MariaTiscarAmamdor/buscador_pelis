window.addEventListener('load', function(ev){
    let botonBusqueda = document.getElementById('searchButton');
    botonBusqueda.addEventListener('click', buscardorPelicula);
    let divDatos = document.getElementById('results');  

    let api_key = 'b6dd848ad7b9a8d3e231b90f9c35cbfa';
    let urlbase = 'https://api.themoviedb.org/3/search/movie';
    //?query=Jack+Reacher&api_key=b6dd848ad7b9a8d3e231b90f9c35cbfa';
    let urlBaseImg = 'https://image.tmdb.org/t/p/w500/';

    function buscardorPelicula() {
        divDatos.innerHTML = 'Cargando...';
        let peliculaEntrada = document.getElementById('searchInput').value;
        fetch(`${urlbase}?query=${peliculaEntrada}&api_key=${api_key}`)
        .then(response => response.json())
        .then(json =>mostrarPeliculas(json.results));      

    }
    function mostrarPeliculas(peliculas){
                  
          divDatos.innerHTML = '';

          if(peliculas.length === 0){
             //contenedor con los datos de cada pelicula
             let divMensaje = document.createElement('div');
             divMensaje.classList.add('mensaje');
             let mensaje =document.createElement('h2');
             mensaje.innerHTML = 'No hay resultados para esa búsqueda';
             divMensaje.appendChild(mensaje);
             divDatos.appendChild(divMensaje);
            
            return
          }
          peliculas.forEach(pelicula => {
            //contenedor con los datos de cada pelicula
            let divPeli = document.createElement('div');
            divPeli.classList.add('movie');

            //elemento imagen pelicula
            let poster = document.createElement('img');
            let urlImg = urlBaseImg + pelicula.poster_path;
            poster.src = urlImg;
            divPeli.appendChild(poster);

            //titulo pelicula
            let titulo = document.createElement('h2');
            titulo.textContent = pelicula.title;
            divPeli.appendChild(titulo);
            //fecha lanzamiento pelicula
            let fecha = document.createElement('p');
            fecha.textContent ='Se estrenó el '+pelicula.release_date;
            divPeli.appendChild(fecha);

             //descripcion pelicula
             let descripcion = document.createElement('p');
             descripcion.textContent =pelicula.overview;
             divPeli.appendChild(descripcion);
            
            //se añade contenedores de las peliculas a contenedor de datos
            divDatos.appendChild(divPeli);

          });

    }

});