const reviewform = document.getElementById("review-form")
const reviewTitle = document.getElementById("title")
const reviewContent = document.getElementById("content")
const reviewRating = document.getElementById("rating")
const reviewList = document.getElementById("review-list")

reviewform.addEventListener("submit", submitReview)

function submitReview(e){
    e.preventDefault()
    const li = document.createElement('li')
    const p = document.createElement('p')
    const commentList = document.createElement('ul')
    
    let arrValues = new Array();
    arrValues.push([e.target.children[1].value, e.target.children[4].value, e.target.children[8].value]);
    let post = arrValues.map(arrValue => `<li>${arrValue}</li>`).join('\n');
    p.innerHTML = post
    
    const commentForm = document.createElement('form')
    commentForm.innerHTML += `<input type="text" id="commentInput"><input type="submit">`
    
    commentForm.addEventListener("submit", submitComment)

    commentList.innerHTML

    li.append(p,commentForm, commentList)
    
    reviewList.appendChild(li)
    
    reviewform.reset()
}

function renderReview(){
    
}

function submitComment(e){
    e.preventDefault()
    const commentInput = e.target.children[0].value
    const commentList = e.target.nextElementSibling
    const li = document.createElement('li')
    li.innerText = commentInput
    commentList.appendChild(li)
    
    e.target.reset()
}