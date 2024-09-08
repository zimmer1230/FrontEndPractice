<script>

import MyAlert from './MyAlert.vue';


export default{
    data(){
        return {
            activeAddBookModal: false,
            activeEditBookModal: false,
            activeDeleteModal: false,
            addBookForm: {
                title: '',
                author: '',
                read: [],
            },
            editBookForm:{
                id: '',
                title:'',
                author:'',
                read: []
            },
            deleteBookID: '',
            books: [],
            message: '',
            showMessage: false
        };
    },
    components:{
        MyAlert: MyAlert
    },
    methods: {
        addBook(payload){
            const path = 'http://localhost:5001/books';
            fetch(path, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            }).then( res=>{
                this.getBooks();
                this.message = 'Book Added.';
                this.showMessage = true;
            });

        },
        getBooks(){
            const path = 'http://localhost:5001/books';
            fetch(path)
            .then(res=>res.json())
            .then( data=>this.books=data.books )
            .catch(err=>{console.error(err)});
        },
        handleAddReset(){
            this.initForm();
        },
        handleAddSubmit(){
            this.toggleAddBookModal();
            let read = false;
            if (this.addBookForm.read[0]){
                read = true;
            }
            const payload = {
                title: this.addBookForm.title,
                author: this.addBookForm.author,
                read
            };
            this.addBook(payload);
            this.initForm();
        },
        initForm(){
            this.addBookForm.title = '';
            this.addBookForm.author = '';
            this.addBookForm.read = [];
            this.editBookForm.id = '';
            this.editBookForm.title = '';
            this.editBookForm.author = '';
            this.editBookForm.read = [];
        },
        toggleAddBookModal(){
            const body = document.querySelector('body');
            this.activeAddBookModal = !this.activeAddBookModal;
            if (this.activeAddBookModal){
                body.classList.add('modal-open');
            }
            else{
                body.classList.remove('modal-open');
            }
        },
        toggleEditBookModal(book){
            if(book){
                this.editBookForm = book;
            }
            const body = document.querySelector('body');
            this.activeEditBookModal = !this.activeEditBookModal;
            if(this.activeEditBookModal){
                body.classList.add('modal-open');
            }
            else{
                body.classList.remove('modal-open');
            }
        },
        toggleDeleteModal(book){
            if(book){
                this.deleteBookID = book.id;
            }
            const body = document.querySelector('body');
            this.activeDeleteModal = !this.activeDeleteModal;
            if(this.activeDeleteModal){
                body.classList.add('modal-open');
            }
            else{
                body.classList.remove('modal-open');
            }
        },
        handleEditSubmit(){
            this.toggleEditBookModal(null);
            let read = false;
            if (this.editBookForm.read) read = true;
            const payload = {
                title: this.editBookForm.title,
                author: this.editBookForm.author,
                read
            };
            this.updateBook(payload, this.editBookForm.id);
        },
        updateBook(payload, bookID){
            const path = `http://localhost:5001/books/${bookID}`;
            fetch(path, {
                method: 'PUT',
                body: JSON.stringify(payload),
                headers: {
                    'Content-type': 'application/json'
                }
            }).then(res=>{
                this.getBooks();
            })
        },
        handleEditCancel(){
            this.toggleEditBookModal(null);
            this.initForm();
            this.getBooks();
        },
        handleDeleteBook(){
            this.toggleDeleteModal(null);
            this.removeBook(this.deleteBookID);
        },
        removeBook(bookID){
            const path = `http://localhost:5001/books/${bookID}`;
            fetch( path,{
                method: 'DELETE',
                headers:{
                    'Content-type': 'application/json'
                }
            } ).then(res=>{
                this.getBooks();
                this.message = 'Book removed.'
                this.showMessage = true;
            })
        }
    },
    created(){
        this.getBooks();
    }
};

</script>


<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-10">
                <h1>Books</h1>
                <hr><br><br>
                <MyAlert :message="message" v-if="showMessage"></MyAlert>
                <button type="button" class="btn btn-success btn-sm" @click="toggleAddBookModal">Add Books</button>
                <br><br>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Author</th>
                            <th scope="col">Read?</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(book, index) in books" :key="index">
                            <td>{{ book.title }}</td>
                            <td>{{ book.author }}</td>
                            <td>
                                <span v-if="book.read">Yes</span>
                                <span v-else>No</span>
                            </td>
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
                        <div class="mb-3 form-check">
                            <input
                                    type="checkbox"
                                    class="form-check-input"
                                    id="addBookRead"
                                    v-model="addBookForm.read">
                            <label class="form-check-label" for="addBookRead">Read?</label>
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
                        <div class="mb-3 form-check">
                            <input 
                                type="checkbox"
                                class="form-check-input"
                                id="editBookRead"
                                v-model="editBookForm.read">
                            <label class="form-check-label"  for="editBookRead">Read?</label>
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