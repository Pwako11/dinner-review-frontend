const reviewForm = document.getElementById("review-form")
const reviewInput = document.getElementById("review-input")
const reviewList = document.getElementById("review-list")
const reviewURL = `http://localhost:3000/reviews`
const commentURL = `http://localhost:3000/comments`

function fetchReviews(){
        fetch(reviewURL)
        .then(resp => resp.json())
        .then(reviews => reviews.forEach(data => renderReview(data.data)));
        }

reviewForm.addEventListener ("submit", submitReview)


function submitReview(){
    event.preventDefault()
   
    const configObj = {
        method: "POST",
        headers:{
            "Content-type": "application/json",
            "Accept": "application/json"
                },
        body: JSON.stringify({
           content: reviewInput.value
        })
    }
    fetch(reviewURL, configObj)
    .then(res => res.json())
    .then(data => renderReview(data.data))   
}

// render review to dom 
function renderReview(review){
    console.log(review)
    const li = document.createElement('li')
    li.dataset.id = review.id

    const p = document.createElement('p')

    p.innerText = review.attributes.content

    const deleteBtn = document.createElement("button")
    deleteBtn.innerText = "delete"
    deleteBtn.addEventListener("click", deleteReview)

    const commentForm = document.createElement('form')
    commentForm.innerHTML += `<input type="text" id="commentInput"><input type="submit">`
    commentForm.addEventListener("submit", renderComment)
    
    const commentList = document.createElement('ul')
    review.attributes.comments.forEach(comment => {
        const commentLi = document.createElement('li')
        commentLi.innerText = comment.content
        commentList.appendChild(commentLi)
    })

    li.append(p, deleteBtn, commentForm, commentList)
    reviewList.appendChild(li)

    reviewForm.reset()
}

function deleteReview(e){
    const reviewId = e.target.parentElement.dataset.id 
    fetch(`${reviewURL}/${reviewId}`, {
        method: "DELETE"
       })    
       e.target.parentElement.remove()
}

function renderComment(e){
    e.preventDefault()
    const commentInput = e.target.children[0].value
    const commentList = e.target.nextElementSibling
    const reviewId = e.target.parentElement.dataset.id

    const li = document.createElement('li')
    li.dataset.id = reviewId
    li.innerText = commentInput
    commentList.appendChild(li)
     
    submitComment(commentInput, reviewId)

    e.target.reset()
}

function submitComment(comment, reviewId){
    console.log(comment)
    fetch(commentURL, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
           content: comment,
           review_id: reviewId
        })
    }) 
}


fetchReviews()