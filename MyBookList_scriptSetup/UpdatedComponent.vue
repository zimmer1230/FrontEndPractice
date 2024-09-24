<script setup>
import Alert from './Alert.vue';
import { onMounted } from 'vue';
import { ref } from 'vue';
const url = 'https://api.sheety.co/447fa712da2772c794eff28e311f666f/booklist/booklist';

let activeAddBookModal = ref(ref(false));
let activeEditBookModal = ref(false);
let activeDeleteModal = ref(false);
let addBookForm = ref({
    title: '',
    author: '',
    rate: ''
});
let editBookForm = ref({
    title:'',
    author:'',
    rate: '',
    id: ''
});
let deleteBookID = ref('');
let books = ref([]);
let message = ref('');
let showMessage = ref(false);
let timeoutId = ref('');

function showWait(){
    message.value = 'Please wait...';
    showMessage.value = true;
};
function addBook(payload){
    showWait();
    const path = url;
    let _temp_book = ref(payload.booklist);
    _temp_book.value.id = books.value.length+2;
    fetch(path, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    }).then( (res)=>{
        books.value.push( _temp_book.value );    //pre-process
        message.value = 'Book Added.';
        showMessage.value = true;
        console.log('addBook');
        console.log(JSON.parse(JSON.stringify(books.value)));
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
            books.value=data.booklist;
            resolve('Successfully getbook');
        })
    })
};
function reset_delay_getBooks(){
    if (!(timeoutId.value===undefined)){
        clearTimeout(timeoutId.value);
    }
    timeoutId.value = setTimeout( ()=>{
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
            title: addBookForm.value.title,
            author: addBookForm.value.author,
            rate: addBookForm.value.rate
        }
    };
    addBook(payload);
    initForm();
};
function initForm(){
    addBookForm.value.title = '';
    addBookForm.value.author = '';
    addBookForm.value.rate = '';
    editBookForm.value.title = '';
    editBookForm.value.author = '';
    editBookForm.value.rate = '';
    editBookForm.value.id = '';
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
        editBookForm.value = book;
    }
    const body = document.querySelector('body');
    activeEditBookModal.value = !activeEditBookModal.value;
    if(activeEditBookModal.value){
        body.classList.add('modal-open');
    }
    else{
        body.classList.remove('modal-open');
    }
};
function toggleDeleteModal(book){
    if(book){
        deleteBookID.value = book.id;
    }
    const body = document.querySelector('body');
    activeDeleteModal.value = !activeDeleteModal.value;
    if(activeDeleteModal.value){
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
        title: editBookForm.value.title,
        author: editBookForm.value.author,
        rate: editBookForm.value.rate
        }
    };
    updateBook(payload, editBookForm.value.id);
};
function updateBook(payload, bookID){
    const path = url+`/${bookID}`;
    message.value = 'Please wait ...';
    showMessage.value = true;
    fetch(path, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {
            'Content-type': 'application/json'
        }
    }).then(res=>{
        message.value = 'Book edited';
        showMessage.value = true;
        //pre-update local data because PUT takes a while
        books.value[bookID-2] = {...books.value[bookID-2],  ...payload.booklist};   
        console.log('updateBook')
        console.log(JSON.parse(JSON.stringify(books.value)));
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
    removeBook(deleteBookID.value);
};
function removeBook(bookID){
    showWait();
    const path = url+`/${bookID}`;
    fetch( path,{
        method: 'DELETE'
    } ).then(res=>{
        message.value = 'Book removed.'
        showMessage.value = true;
        let deleted_index = ref(bookID - 2);
        //pre-update local data because DELETE take a while
        for( let i = ref(deleted_index.value + 1); i.value < books.value.length; i.value++ ){
            books.value[i.value].id = Number(books.value[i.value].id) - 1;
        }
        books.value.splice( deleted_index.value, 1 ); 
        console.log('removeBook');
        console.log(JSON.parse(JSON.stringify(books.value)));
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
                <Alert :message.value="message.value" v-if="showMessage.value"></Alert>
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
                        <tr v-for="(book, index) in books.value" :key="index">
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
        :class="{ show: activeAddBookModal.value, 'd-block': activeAddBookModal.value }" 
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
                                v-model="addBookForm.value.title"
                                placeholder="Enter title">
                        </div>
                        <div class="mb-3">
                            <label for="addBookAuthor" class="form-label">Author:</label>
                            <input
                                type="text"
                                class="form-control"
                                id="addBookAuthor"
                                v-model="addBookForm.value.author"
                                placeholder="Enter author">
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="addBookRate">Rate:</label>
                            <input
                                    type="text"
                                    class="form-control"
                                    id="addBookRate"
                                    v-model="addBookForm.value.rate"
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
    <div v-if="activeAddBookModal.value" class="modal-backdrop fade show"></div>

    <!-- Handling EditModal -->
    <div
        ref="editBookModal"
        class="modal fade"
        :class="{show: activeEditBookModal.value, 'd-block': activeEditBookModal.value}"
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
                                v-model="editBookForm.value.title"
                                placeholder="Enter title">
                        </div>
                        <div class="mb-3">
                            <label for="editBookAuthor" class="form-label">Author:</label>
                            <input 
                                type="text"
                                class="form-control"
                                id="editBookAuthor"
                                v-model="editBookForm.value.author"
                                placeholder="Enter author">
                        </div>
                        <div class="mb-3">
                            <label class="form-label"  for="editBookRate">Rate:</label>
                            <input 
                                type="text"
                                class="form-control"
                                id="editBookRate"
                                v-model="editBookForm.value.rate"
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
    <div v-if="activeEditBookModal.value" class="modal-backdrop fade show"></div>

    <!--Handle Delete Modal-->
    <div
        ref="deleteModal"
        class="modal fade"
        :class="{show: activeDeleteModal.value, 'd-block':activeDeleteModal.value}"
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
    <div v-if="activeDeleteModal.value" class="modal-backdrop fade show"></div>

</template>