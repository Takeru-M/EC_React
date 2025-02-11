<?php

namespace App\Models;

use DateTimeInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class Staff extends Authenticatable
{
  use HasApiTokens, HasFactory, Notifiable, HasRoles;

  protected $table = 'staffs';
  protected $guard_name = 'staff';

  protected $fillable = [
    'first_name',
    'last_name',
    'first_name_kana',
    'last_name_kana',
    'email',
    'phone_number',
    'postal_code',
    'address',
    'password',
    'created_by',
    'exist'
  ];

  protected $hidden = [
    'id',
    'password',
    'profile_id'
  ];

  public function createToken(string $name, $profile, array $abilities = ['*'], ?DateTimeInterface $expiresAt = null)
  {
    $token = parent::createToken($name);
    $token->token->abilities = ['staff'];
    return $token;
  }
}
