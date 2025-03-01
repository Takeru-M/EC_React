<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class GuestUser extends Model
{
  protected $fillable = [
    'guest_id',
  ];

  public function carts(): HasMany
  {
    return $this->hasMany(Cart::class);
  }

  public function favorites(): HasMany
  {
    return $this->hasMany(Favorite::class);
  }
}
