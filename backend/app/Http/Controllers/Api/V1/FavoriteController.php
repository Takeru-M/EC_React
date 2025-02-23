<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Services\FavoriteService;

class FavoriteController extends Controller
{
    private $favoriteService;

    public function __construct(FavoriteService $favoriteService)
    {
        $this->favoriteService = $favoriteService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $params = $request->all();
        $data = $this->favoriteService->create($params);

        return response()->json(['data' => $data], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $user_id )
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($favorite_id)
    {
        $data = $this->favoriteService->delete($favorite_id);

        return response()->json(['data' => $data], 200);
    }

    public function getList(Request $request)
    {
        $params = $request->all();
        $data = $this->favoriteService->getList($params);
        return response()->json(['data' => $data['data'], 'total' => $data['total'], 'per_page' => $data['per_page'], 'current_page' => $data['current_page']], 200);
    }
}
