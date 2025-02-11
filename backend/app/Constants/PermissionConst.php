<?php

declare(strict_types=1);

namespace App\Constants;

class PermissionConst
{
  public const VIEW_USERS = 'view_users';
  public const CREATE_USERS = 'create_users';
  public const UPDATE_USERS = 'update_users';
  public const DELETE_USERS = 'delete_users';

  public const VIEW_PRODUCTS = 'view_products';
  public const CREATE_PRODUCTS = 'create_products';
  public const UPDATE_PRODUCTS = 'update_products';
  public const DELETE_PRODUCTS = 'delete_products';

  public const PERMISSIONS = [
    self::VIEW_USERS,
    self::CREATE_USERS,
    self::UPDATE_USERS,
    self::DELETE_USERS,
    self::VIEW_PRODUCTS,
    self::CREATE_PRODUCTS,
    self::UPDATE_PRODUCTS,
    self::DELETE_PRODUCTS
  ];
}
