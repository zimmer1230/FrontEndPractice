<script setup>
import Alert from './Alert.vue';
import { onMounted } from 'vue';
import { ref } from 'vue';
const url = 'https://api.sheety.co/447fa712da2772c794eff28e311f666f/booklist/booklist';

let activeAddBookModal = ref(false);
let activeEditBookModal = false;
let activeDeleteModal = false;
let addBookForm = {
    title: '',
    author: '',
    rate: ''
};
let editBookForm = {
    title:'',
    author:'',
    rate: '',
    id: ''
};
let deleteBookID = '';
let books = [];
let message = '';
let showMessage = false;
let timeoutId = '';

function showWait(){
    message = 'Please wait...';
    showMessage = true;
};
function addBook(payload){
    showWait();
    const path = url;
    let _temp_book = payload.booklist;
    _temp_book.id = books.length+2;
    fetch(path, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    }).then( (res)=>{
        books.push( _temp_book );    //pre-process
        message = 'Book Added.';
        showMessage = true;
        console.log('addBook');
        console.log(JSON.parse(JSON.stringify(books)));
        reset_delay_getBooks();
    });
};
function getBooks(){
    return new Promise( (resolve, reject)=>{
        console.log('getBooks');
        const path = url;
        fetch(path)
        .then(  res=>{
            if (res.ok){
                return res.json();
            } 
            else{
                reject('getBook failed.');
            }
        } )
        .then( data=>{
            console.log(data.booklist);
            books=data.booklist;
            resolve('Successfully getbook');
        })
    })
};
function reset_delay_getBooks(){
    if (!(timeoutId===undefined)){
        clearTimeout(timeoutId);
    }
    timeoutId = setTimeout( ()=>{
        getBooks();
    }, 30000);
};
function handleAddReset(){
    initForm();
};
function handleAddSubmit(){
    toggleAddBookModal();
    const payload = {
        booklist:{
            title: addBookForm.title,
            author: addBookForm.author,
            rate: addBookForm.rate
        }
    };
    addBook(payload);
    initForm();
};
function initForm(){
    addBookForm.title = '';
    addBookForm.author = '';
    addBookForm.rate = '';
    editBookForm.title = '';
    editBookForm.author = '';
    editBookForm.rate = '';
    editBookForm.id = '';
};
function toggleAddBookModal(){
    const body = document.querySelector('body');
    activeAddBookModal.value = !activeAddBookModal.value;
    if (activeAddBookModal.value){
        body.classList.add('modal-open');
    }
    else{
        body.classList.remove('modal-open');
    }
};
function toggleEditBookModal(book){
    if(book){
        editBookForm = book;
    }
    const body = document.querySelector('body');
    activeEditBookModal = !activeEditBookModal;
    if(activeEditBookModal){
        body.classList.add('modal-open');
    }
    else{
        body.classList.remove('modal-open');
    }
};
function toggleDeleteModal(book){
    if(book){
        deleteBookID = book.id;
    }
    const body = document.querySelector('body');
    activeDeleteModal = !activeDeleteModal;
    if(activeDeleteModal){
        body.classList.add('modal-open');
    }
    else{
        body.classList.remove('modal-open');
    }
};
function handleEditSubmit(){
    toggleEditBookModal(null);
    const payload = {
        booklist:{
        title: editBookForm.title,
        author: editBookForm.author,
        rate: editBookForm.rate
        }
    };
    updateBook(payload, editBookForm.id);
};
function updateBook(payload, bookID){
    const path = url+`/${bookID}`;
    message = 'Please wait ...';
    showMessage = true;
    fetch(path, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {
            'Content-type': 'application/json'
        }
    }).then(res=>{
        message = 'Book edited';
        showMessage = true;
        //pre-update local data because PUT takes a while
        books[bookID-2] = {...books[bookID-2],  ...payload.booklist};   
        console.log('updateBook')
        console.log(JSON.parse(JSON.stringify(books)));
        reset_delay_getBooks();
    })
};
function handleEditCancel(){
    toggleEditBookModal(null);
    initForm();
    getBooks();
};
function handleDeleteBook(){
    toggleDeleteModal(null);
    removeBook(deleteBookID);
};
function removeBook(bookID){
    showWait();
    const path = url+`/${bookID}`;
    fetch( path,{
        method: 'DELETE'
    } ).then(res=>{
        message = 'Book removed.'
        showMessage = true;
        let deleted_index = bookID - 2;
        //pre-update local data because DELETE take a while
        for( let i = deleted_index + 1; i < books.length; i++ ){
            books[i].id = Number(books[i].id) - 1;
        }
        books.splice( deleted_index, 1 ); 
        console.log('removeBook');
        console.log(JSON.parse(JSON.stringify(books)));
        reset_delay_getBooks();
    })
};

onMounted( ()=>{
    getBooks();
} )

</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-10">
                <h1>Books</h1>
                <hr><br><br>
                <Alert :message="message" v-if="showMessage"></Alert>
                <button type="button" class="btn btn-success btn-sm" @click="toggleAddBookModal">Add Books</button>
                <br><br>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Author</th>
                            <th scope="col">Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(book, index) in books" :key="index">
                            <td>{{ book.title }}</td>
                            <td>{{ book.author }}</td>
                            <td>{{ book.rate }}</td>
                            <td>
                                <div class="btn-group" role="group">
                                    <button type="button" class="btn btn-warning btn-sm" @click="toggleEditBookModal(book)">Edit</button>
                                    <button type="button" class="btn btn-danger btn-sm" @click="toggleDeleteModal(book)">Delete</button>
                                </div>
                            </td>
                        </tr>
        

                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <!-- Handling AddModal -->
    <div
        ref="addBookModal"
        class="modal fade"
        :class="{ show: activeAddBookModal, 'd-block': activeAddBookModal }" 
        tabindex="-1"
        role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add new book</h5>
                    <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-lablel="Close"
                        @click="toggleAddBookModal">
                        <span aria-hidden="true">X</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label for="addBookTitle" class="form-label">Title:</label>
                            <input 
                                type="text"
                                class="form-control"
                                id="addBookTitle"    
                                v-model="addBookForm.title"
                                placeholder="Enter title">
                        </div>
                        <div class="mb-3">
                            <label for="addBookAuthor" class="form-label">Author:</label>
                            <input
                                type="text"
                                class="form-control"
                                id="addBookAuthor"
                                v-model="addBookForm.author"
                                placeholder="Enter author">
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="addBookRate">Rate:</label>
                            <input
                                    type="text"
                                    class="form-control"
                                    id="addBookRate"
                                    v-model="addBookForm.rate"
                                    placeholder="Enter rate from 0.0 ~ 5.0">
                        </div>                  
                        <div class="btn-group" role="group">
                            <button
                                type="button"
                                class="btn btn-primary btn-sm"
                                @click="handleAddSubmit">
                                Submit
                            </button>
                            <button
                                type="button"
                                class="btn btn-danger btn-sm"
                                @click="handleAddReset">
                                Reset
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div v-if="activeAddBookModal" class="modal-backdrop fade show"></div>

    <!-- Handling EditModal -->
    <div
        ref="editBookModal"
        class="modal fade"
        :class="{show: activeEditBookModal, 'd-block': activeEditBookModal}"
        tabindex="-1"
        role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Update</h5>
                    <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        @click="toggleEditBookModal">
                    <span aria-hidden="true">X</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label for="editBookTitle" class="form-label">Title:</label>
                            <input 
                                type="text"
                                class="form-control"
                                id="editBookTitle"
                                v-model="editBookForm.title"
                                placeholder="Enter title">
                        </div>
                        <div class="mb-3">
                            <label for="editBookAuthor" class="form-label">Author:</label>
                            <input 
                                type="text"
                                class="form-control"
                                id="editBookAuthor"
                                v-model="editBookForm.author"
                                placeholder="Enter author">
                        </div>
                        <div class="mb-3">
                            <label class="form-label"  for="editBookRate">Rate:</label>
                            <input 
                                type="text"
                                class="form-control"
                                id="editBookRate"
                                v-model="editBookForm.rate"
                                placeholder="Enter rate ranged from 0.0 ~ 5.0">
                        </div>
                        <div class="btn-group" role="group">
                            <button
                                type="button"
                                class="btn btn-primary btn-sm"
                                @click="handleEditSubmit">
                            Submit
                            </button>
                            <button
                                type="button"
                                class="btn btn-danger btn-sm"
                                @click="handleEditCancel">
                            Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div v-if="activeEditBookModal" class="modal-backdrop fade show"></div>

    <!--Handle Delete Modal-->
    <div
        ref="deleteModal"
        class="modal fade"
        :class="{show: activeDeleteModal, 'd-block':activeDeleteModal}"
        tabindex="-1"
        role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Are you sure you want to delete?</h5>
                    <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        @click="toggleDeleteModal">
                        <span aria-hidden="true">X</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="btn-group" role="group">
                        <button
                            type="button"
                            class="btn btn-danger btn-sm"
                            @click="handleDeleteBook()">
                        Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>    
    <div v-if="activeDeleteModal" class="modal-backdrop fade show"></div>

</template>