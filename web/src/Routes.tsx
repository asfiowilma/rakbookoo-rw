// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import BooksLayout from 'src/layouts/BooksLayout'
import ShelvesLayout from 'src/layouts/ShelvesLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={BooksLayout}>
        <Route path="/books/new" page={BookNewBookPage} name="newBook" />
        <Route path="/books/{id:Int}/edit" page={BookEditBookPage} name="editBook" />
        <Route path="/books/{id:Int}" page={BookBookPage} name="book" />
        <Route path="/books" page={BookBooksPage} name="books" />
      </Set>
      <Set wrap={ShelvesLayout}>
        <Route path="/shelves/new" page={ShelfNewShelfPage} name="newShelf" />
        <Route path="/shelves/{id:Int}/edit" page={ShelfEditShelfPage} name="editShelf" />
        <Route path="/shelves/{id:Int}" page={ShelfShelfPage} name="shelf" />
        <Route path="/shelves" page={ShelfShelvesPage} name="shelves" />
      </Set>
      <Route path="/profile" page={ProfilePage} name="profile" />
      <Route path="/" page={HomePage} name="home" />
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
