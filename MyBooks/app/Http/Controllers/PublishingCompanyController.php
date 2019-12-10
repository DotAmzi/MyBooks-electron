<?php

namespace App\Http\Controllers;

use App\PublishingCompany;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class PublishingCompanyController extends Controller
{

    protected $model;

    /**
     * PublishingCompanyController constructor.
     * @param PublishingCompany $model
     */
    public function __construct(PublishingCompany $model)
    {
        $this->model = $model;
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
        ]);

        $getData = PublishingCompany::where('name', $valueArray['name'])->count();
        if ($getData > 0) {
            return response()->json([
                'message' => 'Publishing Company already exist!',
            ], 409);
        }
        $newPublisher = $this->model->create($valueArray);
        $newPublisher->save();

        return response()->json(
            array('message' => 'Publishing company created successfull', 'data' => $newPublisher)
            , 201);
    }

    /**
     * @return JsonResponse
     */
    public function index()
    {
        $publishers = PublishingCompany::get();
        return response()->json($publishers, 200);
    }

    /**
     * @param Request $request
     * @param $id
     * @return JsonResponse
     * @throws ValidationException
     */
    public function update(Request $request, $id)
    {
        $publisher = PublishingCompany::find($id);

        if (!$publisher) {
            return response()->json([
                'message' => 'Publisher not found',
            ], 404);
        }

        $valueArray = $request->json()->all();

        $this->validate($request, [
            'name' => 'required',
        ]);

        $publisher->update($valueArray);

        return response()->json(['message' => 'Publisher updated', 'data' => $publisher], 200);
    }

    /**
     * @param $id
     * @return JsonResponse
     */
    public function get($id)
    {
        $publisher = PublishingCompany::find($id);
        if (!$publisher) {
            return response()->json([
                'message' => 'Publisher not found',
            ], 404);
        }
        return response()->json($publisher, 200);
    }

    /**
     * @param $id
     * @return JsonResponse
     */
    public function destroy($id)
    {
        $publisher = PublishingCompany::find($id);
        if (!$publisher) {
            return response()->json([
                'message' => 'Publisher not found',
            ], 404);
        }
        $publisher->delete();
        return response()->json(
            array('message' => 'Publishing company removed with success')
            , 200);
    }


}
