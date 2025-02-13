<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use DateTimeInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
  /** @use HasFactory<\Database\Factories\UserFactory> */
  use HasApiTokens, HasFactory, Notifiable, HasRoles;

  /**
   * The attributes that are mass assignable.
   *
   * @var list<string>
   */
  protected $fillable = [
    'login_name',
    'first_name',
    'last_name',
    'first_name_kana',
    'last_name_kana',
    'email',
    'phone_number',
    'postal_code',
    'address',
    'exist',
  ];

  /**
   * The attributes that should be hidden for serialization.
   *
   * @var list<string>
   */
  protected $hidden = [
    'password',
    'remember_token',
  ];

  /**
   * Get the attributes that should be cast.
   *
   * @return array<string, string>
   */
  protected function casts(): array
  {
    return [
      'email_verified_at' => 'datetime',
      'password' => 'hashed',
    ];
  }

  public function orders(): HasMany
  {
    return $this->hasMany(Order::class);
  }

  public function carts(): HasMany
  {
    return $this->hasMany(Cart::class);
  }

  public function shippingAddresses(): HasMany
  {
    return $this->hasMany(ShippingAdress::class);
  }

  public function reviews(): HasMany
  {
    return $this->hasMany(Review::class);
  }

  public function favorites(): HasMany
  {
    return $this->hasMany(Favorite::class);
  }

  // public function createToken(string $name, array $abilities = ['*'], ?DateTimeInterface $expiresAt = null)
  // {
  //   $token = parent::createToken($name);
  //   $token->token->abilities = ['user'];
  //   return $token;
  // }
}
