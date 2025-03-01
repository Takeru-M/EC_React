<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Services\FavoriteService;
use Illuminate\Support\Facades\Cookie;
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

    public function fetchFavorites(Request $request)
    {
        $params = $request->all();
        $data = $this->favoriteService->fetchFavorites($params);
        return response()->json(['data' => $data['data'], 'total' => $data['total'], 'per_page' => $data['per_page'], 'current_page' => $data['current_page']], 200);
    }

    public function fetchFavoritesForGuest(Request $request)
    {
        $id = $request->cookie('guest_id');
        $params = $request->all();
        $params['guest_id'] = $id;
        $data = $this->favoriteService->fetchFavoritesForGuest($params);
        return response()->json(['data' => $data['data'], 'total' => $data['total'], 'per_page' => $data['per_page'], 'current_page' => $data['current_page']], 200);
    }

    public function storeForGuest(Request $request)
    {
        $id = $request->cookie('guest_id');
        $params = $request->all();
        $params['guest_id'] = $id;
        $data = $this->favoriteService->createForGuest($params);
        return response()->json(['data' => $data], 201);
    }

    public function integrateFavorite(Request $request)
    {
      try {
        $id = $request->cookie('guest_id');
        $params = $request->all();
        $params['guest_id'] = $id;
        $this->favoriteService->integrateFavorite($params);
        return response()->noContent(200)->withCookie(Cookie::forget('guest_id'));
      } catch (\Exception $e) {
        return response()->json(['message' => $e->getMessage()], 500);
      }
    }
}
