<script>

import Alert from './Alert.vue';
const API_key = 'AIzaSyDp62whMzhljQkJHUsJn53ovIros385yeo';
const SheetID = '1Bvdah21gDf0Iqg8hdoWb789-2gQGwuiHiwNyqncQtuE';
const range = 'Sheet1!A2:C';
const base_url = `https://sheets.googleapis.com/v4/spreadsheets/${SheetID}/values/${range}`;

export default{
    data(){
        return {
            activeAddBookModal: false,
            activeEditBookModal: false,
            activeDeleteModal: false,
            addBookForm: {
                title: '',
                author: '',
                rate: ''
            },
            editBookForm:{
                title:'',
                author:'',
                rate: ''
            },
            deleteBookID: '',
            books: [],
            message: '',
            showMessage: false
        };
    },
    components:{
        Alert: Alert
    },
    methods: {
        addBook(payload){
            const path = base_url+`:append?valueInputOption=RAW?key=${API_key}`;
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
            console.log('getBooks');
            const path = base_url+`?key=${API_key}`;
            fetch(path)
            .then(res=>res.json())
            .then( data=> this.books= data.values.map( ([book, author, rate])=> ({'title': book, 'author': author, 'rate': rate}) ) )
            .catch(err=>{console.error(err)});
        },
        handleAddReset(){
            this.initForm();
        },
        handleAddSubmit(){
            this.toggleAddBookModal();
            const payload = {
                range: range,
                majorDimension: "ROWS",
                value: [this.addBookForm.title,
                        this.addBookForm.author,
                        this.addBookForm.rate]
            };
            this.addBook(payload);
            this.initForm();
        },
        initForm(){
            this.addBookForm.title = '';
            this.addBookForm.author = '';
            this.addBookForm.rate = '';
            this.editBookForm.title = '';
            this.editBookForm.author = '';
            this.editBookForm.rate = '';
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
                        <div class="mb-3 form-check">
                            <label class="form-label" for="addBookRate">Rate:</label>
                            <input
                                    type="text"
                                    class="form-control"
                                    id="addBookRate"
                                    v-model="addBookForm.rate">
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
                            <label class="form-check-label"  for="editBookRate">Rate:</label>
                            <input 
                                type="text"
                                class="form-control"
                                id="editBookRate"
                                v-model="editBookForm.rate">
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