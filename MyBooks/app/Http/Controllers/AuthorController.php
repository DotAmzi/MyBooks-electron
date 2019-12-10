<?php

namespace App\Http\Controllers;

use App\Author;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class AuthorController extends Controller
{
    protected $model;

    /**
     * AuthorController constructor.
     * @param Author $model
     */
    public function __construct(Author $model)
    {
        $this->model = $model;
    }

    /**
     * @return JsonResponse
     */
    public function index()
    {
        $authors = Author::get();
        return response()->json($authors, 200);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     * @throws ValidationException
     */
    public function save(Request $request) {
        $valueArray = $request->json()->all();
        $this->validate($request, [
            'name' => 'required',
        ]);

        $getData = Author::where('name', $valueArray['name'])->count();
        if ($getData > 0) {
            return response()->json([
                'message' => 'Author already exist!',
            ], 409);
        }

        $author = $this->model->create($valueArray);
        $author->save();

        return response()->json(
            array('message' => 'Author created successfull', 'data' => $author)
            , 201);
    }

    /**
     * @param Request $request
     * @param $id
     * @return JsonResponse
     * @throws ValidationException
     */
    public function update(Request $request, $id)
    {
        $author = Author::find($id);

        if (!$author) {
            return response()->json([
                'message' => 'Author not found',
            ], 404);
        }

        $valueArray = $request->json()->all();

        $this->validate($request, [
            'name' => 'required',
        ]);

        $author->update($valueArray);

        return response()->json(['message' => 'Author updated', 'data' => $author], 200);

    }

    /**
     * @param $id
     * @return JsonResponse
     */
    public function get($id)
    {
        $author = Author::find($id);
        if (!$author) {
            return response()->json([
                'message' => 'Author not found',
            ], 404);
        }
        return response()->json($author, 200);
    }

    /**
     * @param $id
     * @return JsonResponse
     */
    public function destroy($id)
    {
        try {
            $author = Author::find($id);
            if (!$author) {
                return response()->json([
                    'message' => 'Author not found',
                ], 404);
            }
            $author->delete();
            return response()->json(
                array('message' => 'Author removed with success')
                , 200);
        } catch (Exception $e) {
            return response()->isServerError($e);
        }
    }
}
