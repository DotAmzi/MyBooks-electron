<?php

namespace App\Http\Controllers;

use App\Book;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class BookController extends Controller
{
    protected $model;
    protected $authorController;
    protected $publishingCompany;

    /**
     * BookController constructor.
     * @param Book $book
     * @param AuthorController $authorController
     * @param PublishingCompanyController $publishingCompany
     */
    public function __construct(Book $book, AuthorController $authorController, PublishingCompanyController $publishingCompany)
    {
        $this->model = $book;
        $this->authorController = $authorController;
        $this->publishingCompany = $publishingCompany;
    }

    /**
     * @return ResponseFactory|Response
     */
    public function index()
    {
        $books = Book::get();
        return response($books, 200);
    }

    /**
     * @param $id
     * @return JsonResponse
     */
    public function get($id)
    {
        $book = Book::find($id);
        if (!$book) {
            return response()->json([
                'message' => 'Book not found',
            ], 404);
        }
        return response()->json($book, 200);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     * @throws ValidationException
     */
    public function save(Request $request)
    {
        $valueArray = $request->json()->all();
        $this->validate($request, [
            'name' => 'required',
            'ISBN' => 'required',
            'author_id' => 'required',
            'publishing_company_id' => 'required'
        ]);

        $getData = Book::where('ISBN', $valueArray['ISBN'])->count();
        $return_author = $this->authorController->get($valueArray['author_id']);
        $return_publishing = $this->publishingCompany->get($valueArray['publishing_company_id']);
        $message_error = null;
        if ($return_author->getStatusCode() == 404) $message_error = $return_author->getOriginalContent()['message'];
        if ($return_publishing->getStatusCode() == 404) $message_error = $return_publishing->getOriginalContent()['message'];
        if ($getData > 0) $message_error = 'Book already exist!';
        if ($message_error != null) {
            return response()->json([
                'message' => $message_error,
            ], 409);
        }

        $author = $this->model->create($valueArray);
        $author->save();

        return response()->json(
            array('message' => 'Book created successfull', 'data' => $author)
            , 201);
    }

    /**
     * @param Request $request
     * @param $id
     * @return JsonResponse
     */
    public function update(Request $request, $id)
    {
        $valueArray = $request->json()->all();
        $book = Book::find($id);
        $message_error = null;

        if ($valueArray['author_id']) {
            $return_author = $this->authorController->get($valueArray['author_id']);
            if ($return_author->getStatusCode() == 404)
                $message_error = $return_author->getOriginalContent()['message'];

        }
        if ($valueArray['publishing_company_id']) {
            $return_publishing = $this->publishingCompany->get($valueArray['publishing_company_id']);
            if ($return_publishing->getStatusCode() == 404)
                $message_error = $return_publishing->getOriginalContent()['message'];
        }

        if (!$book) $message_error = 'Book not found!';
        if ($message_error != null) {
            return response()->json([
                'message' => $message_error,
            ], 409);
        }
        $book->update($valueArray);

        return response()->json(
            array('message' => 'Book updated', 'data' => $book)
            , 200);
    }

    /**
     * @param $id
     * @return JsonResponse
     */
    public function destroy($id)
    {
        $book = Book::find($id);
        if (!$book) {
            return response()->json([
                'message' => 'Book not found',
            ], 404);
        }
        $book->delete();

        return response()->json(
            array('message' => 'Book removed with success')
            , 200);
    }

}
