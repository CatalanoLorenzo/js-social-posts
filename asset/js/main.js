//array contenente gli oggetti con i dati dei post
const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

// creo una variabile e l'associo al container della DOM
const containerEl = document.getElementById('container')

posts.forEach((val) => {

    //creo e aggiundo agli oggetti dell'array una condizione per moodificare il valore  del like
    val['like_condition'] = false;
    //associo ad una variabile il valore della kay dell'oggetto
    let media = val.media;
    //associo ad una variabile il valore della kay dell'oggetto
    let name = val.author.name;
    //associo ad una variabile il valore della kay dell'oggetto al rovescio
    let time = (rever_data(val.created));
    //lo logga in console per una verifica
    console.log(time);
    //associo ad una variabile il valore della kay dell'oggetto
    let text = val.content;
    //associo ad una variabile il valore della kay dell'oggetto
    let id = Number(val.id);
    // creo una variabile 
    let image;
    // creo una condizione per associare un valore alla variabile
    if (val.author.image == null) {

        // se il valore è nulllo gli do una immagine presolder
        image = img_Presolder(val.author.name);

    } else {

        //sennò associo il valore della kay dell'oggetto
        image = `<img class="profile-pic" src="${val.author.image}" alt="Phil Mangione">`;

    }

    //associo ad una variabile il valore della kay dell'oggetto
    let positionPost = val.id
    //associo ad una variabile il valore della kay dell'oggetto
    let numberOfLike = val.likes
    //lo logga in console per una verifica
    console.log(media, name, time, text, image, positionPost, numberOfLike);
    //utilizzo la funzione generated_post e la inserisco allinterno del container nella DOM
    containerEl.insertAdjacentElement('beforeend', generated_post(image, name, time, text, media, positionPost, numberOfLike, id))

})

//associo ad una variabile tutti i  tasti like      
const like_button = document.querySelectorAll('.like-button');
//lo logga in console per una verifica
console.log(posts);
//lo logga in console per una verifica
console.log(like_button);

//creo un ciclo che mi associa un indice per ogni bottone like in pagina
for (let i = 0; i < like_button.length; i++) {

    //sta in attesa del click del tasto selezionato dal ciclo
    like_button[i].addEventListener('click', function () {

        //lo logga in console per una verifica
        console.log('click');

        //lo logga in console per una verifica
        console.log(posts[i].likes);

        //associo ad una variabile il contenitore del numero del like
        const containerNumber = document.getElementById(`like-counter-${posts[i].id}`);

        //lo logga in console per una verifica
        console.log(containerNumber);

        //lo logga in console per una verifica
        console.log(posts[i].like_condition);

        //realizzo una condizione per incrementare e decrementare il valore dentro il contenitore del like
        if (!posts[i].like_condition) {

            //uso funzione per incrementare il numero di like e dare un colore al tasto
            increment_like(like_button, i, posts, containerNumber);

        } else {

            //uso funzione per decrementare il numero di like e togliere colore al tasto
            decrement_like(like_button, i, posts, containerNumber);

        }

        //lo logga in console per una verifica
        console.log(posts[i].likes);

    })
}

//-----------------------POST-------------------------------------------------
function generated_post(media, name, time, text, image, positionPost, numberOfLike, id) {

    const post = document.createElement('div')
    post.classList.add('post')
    post.insertAdjacentElement('beforeend', generated_post_header(media, name, time))
    post.insertAdjacentElement('beforeend', generated_post_text(text))
    post.insertAdjacentElement('beforeend', generated_post_image(image))
    post.insertAdjacentElement('beforeend', generated_post_footer(positionPost, numberOfLike, id))



    return post
}
//------------------------POST HEADER----------------------------------------------------------

function generated_post_header(media, name, time) {
    const post_header = document.createElement('div')
    post_header.classList.add('post__header')
    post_header.insertAdjacentElement('beforeend', generated_post_meta(media, name, time))
    return post_header
}
function generated_post_meta(media, name, time) {
    const post_meta = document.createElement('div')
    post_meta.classList.add('post-meta')
    post_meta.insertAdjacentElement('beforeend', generated_post_meta_icon(media))
    post_meta.insertAdjacentElement('beforeend', generated_post_meta_data(name, time))
    return post_meta
}
function generated_post_meta_icon(media) {
    const post_meta_icon = document.createElement('div')
    post_meta_icon.classList.add('post-meta__icon')
    const icon = `${media}`
    post_meta_icon.innerHTML = icon
    return post_meta_icon
}
function generated_post_meta_data(name, time) {
    const post_meta_data = document.createElement('div')
    post_meta_data.classList.add('post-meta__data')
    post_meta_data.insertAdjacentElement('beforeend', generated_post_meta_data_author(name))
    post_meta_data.insertAdjacentElement('beforeend', generated_post_meta_data_author(time))
    return post_meta_data
}
function generated_post_meta_data_author(name) {
    const post_meta_data_author = document.createElement('div')
    post_meta_data_author.classList.add('post-meta__author')
    post_meta_data_author.innerText = `${name}`
    return post_meta_data_author
}
function generated_post_meta_data_author(time) {
    const post_meta_data_author = document.createElement('div')
    post_meta_data_author.classList.add('post-meta__time')
    post_meta_data_author.innerText = `${time}`
    return post_meta_data_author
}

//---------------------------POST TEXT---------------------------------------

function generated_post_text(text) {
    const post_text = document.createElement('div')
    post_text.classList.add('post__text')
    post_text.innerText = `${text}`
    return post_text
}

//-----------------------------POST IMAGE------------------------------------
function generated_post_image(image) {
    const post_image = document.createElement('div')
    post_image.classList.add('post__image')
    const img = document.createElement('img')
    img.src = `${image}`
    post_image.insertAdjacentElement('beforeend', img)

    return post_image
}
//---------------------------POST FOOTER------------------------------------------
function generated_post_footer(positionPost, numberOfLike, id) {
    const post_footer = document.createElement('div')
    post_footer.classList.add('post__footer')
    post_footer.insertAdjacentElement('beforeend', generated_likes(positionPost, numberOfLike, id))
    return post_footer
}

function generated_likes(positionPost, numberOfLike, id) {
    const post_footer_likes = document.createElement('div')
    post_footer_likes.classList.add('likes', 'js-likes')
    post_footer_likes.insertAdjacentElement('beforeend', generated_likes_cta(positionPost))
    post_footer_likes.insertAdjacentElement('beforeend', generated_likes_counter(numberOfLike, id))
    return post_footer_likes
}

function generated_likes_cta(positionPost) {
    const post_footer_likes_cta = document.createElement('div')
    post_footer_likes_cta.classList.add('likes__cta')
    const aEl = `
    <a class="like-button  js-like-button" href="#" data-postid="${positionPost}">
        <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
        <span class="like-button__label">Mi Piace</span>
    </a>
    `

    post_footer_likes_cta.insertAdjacentHTML('beforeend', aEl)
    return post_footer_likes_cta
}

function generated_likes_counter(numberOfLike, id) {
    const post_footer_likes_counter = document.createElement('div')
    post_footer_likes_counter.classList.add('likes__counter')
    post_footer_likes_counter.innerHTML = `Piace a <b id="like-counter-${id}" class="js-likes-counter">${numberOfLike}</b> persone`
    return post_footer_likes_counter
}

//---------------------------IMAGE PROFILE PRESOLDER------------------------------------------
function get_frist_letter_of_string(stringa) {
    return stringa[0]
}
function get_single_word_of_string_into_array(stringa) {
    return stringa.split(' ')

}
function img_Presolder(NomeUtente) {
    const Array_of_NomeUtente = get_single_word_of_string_into_array(NomeUtente)
    const fristWord = Array_of_NomeUtente[0]
    const fristletter_of_fristWord = get_frist_letter_of_string(fristWord)
    const secondWord = Array_of_NomeUtente[1]
    const fristletter_of_secondWord = get_frist_letter_of_string(secondWord)
    const cirleDivEl = `<div class='circle'>${fristletter_of_fristWord} ${fristletter_of_secondWord}</div>`
    return cirleDivEl

}

//---------------------------GENERETOR DATA RANDOM------------------------------------------
function data_random() {
    const anno = Math.floor(Math.random() * (2023 - 1995)) + 1995
    let mese = Math.floor(Math.random() * (12 - 1)) + 1

    if (mese = 1 || 3 || 5 || 7 || 8 || 10 || 12) {
        const giorno = Math.floor(Math.random() * (31 - 1)) + 1
        const data = `${giorno}/${mese}/${anno}`
        return data

    } else if (mese = 4 || 6 || 9 || 11) {
        const giorno = Math.floor(Math.random() * (30 - 1)) + 1
        const data = `${giorno}/${mese}/${anno}`
        return data

    } else {
        const giorno = Math.floor(Math.random() * (29 - 1)) + 1
        const data = `${giorno}/${mese}/${anno}`
        return data

    }


}
//---------------------------REVER DATA USA TO ITA------------------------------------------
/**
 * 
 * @param {string} data 
 */
function rever_data(data) {
    let arrayTime = data.split('-')
    console.log(arrayTime);
    let reverseArrayTime = arrayTime.reverse()
    console.log(reverseArrayTime);
    let deta = reverseArrayTime.join('/')
    console.log(deta);
    return deta
}
//---------------------------INCREMENT LIKE------------------------------------------
function increment_like(tastoLike, i, Array, elementoConNumeroLike) {
    //aggiunge la classe blue
    tastoLike[i].classList.add('blue')
    //cambia il valore  di inizio condizione cosi che non si ripeta
    Array[i].like_condition = true
    //incrementa il numero di like
    Array[i].likes++
    //sovrascrive il vecchio valore
    elementoConNumeroLike.innerText = Array[i].likes
    //lo logga in console per una verifica
    console.log(Array[i].like_condition);
}
//---------------------------DECREMENT LIKE------------------------------------------
function decrement_like(tastoLike, i, Array, elementoConNumeroLike) {

    //rimuovo la classe blue
    tastoLike[i].classList.remove('blue')
    //cambia il valore  di inizio condizione cosi che non si ripeta
    Array[i].like_condition = false
    //decremento il numero di like
    Array[i].likes--
    //sovrascrive il vecchio valore
    elementoConNumeroLike.innerText = Array[i].likes
    //lo logga in console per una verifica          
    console.log(Array[i].like_condition);

}