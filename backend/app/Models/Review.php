<?php

namespace App\Models;

use DateTimeInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class Review extends Authenticatable
{
  use HasApiTokens, HasFactory, Notifiable, HasRoles;

  protected $table = 'reviews';

  protected $fillable = [
    'user_id',
    'product_id',
    'rating',
    'comment',
    'deleted_at'
  ];

  protected $hidden = [
    'id',
  ];

  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class);
  }

  public function product(): BelongsTo
  {
    return $this->belongsTo(Product::class);
  }
}
