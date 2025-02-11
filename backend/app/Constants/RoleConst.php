<?php

declare(strict_types=1);

namespace App\Constants;

use App\Constants\PermissionConst;

class RoleConst{
    public const ADMIN_ROLE = 'adminRole';
    public const MANAGER_ROLE = 'managerRole';
    public const EMPLOYEE_ROLE = 'employeeRole';

    public const ROLE_PERMISSIONS = [
        'adminRole' => [
          PermissionConst::VIEW_USERS,
          PermissionConst::CREATE_USERS,
          PermissionConst::UPDATE_USERS,
          PermissionConst::DELETE_USERS,
          PermissionConst::VIEW_PRODUCTS,
          PermissionConst::CREATE_PRODUCTS,
          PermissionConst::UPDATE_PRODUCTS,
          PermissionConst::DELETE_PRODUCTS,
        ],
        'managerRole' => [
          PermissionConst::VIEW_USERS,
          PermissionConst::VIEW_PRODUCTS,
          PermissionConst::CREATE_PRODUCTS,
          PermissionConst::UPDATE_PRODUCTS,
          PermissionConst::DELETE_PRODUCTS,
        ],
        'employeeRole' => [
          PermissionConst::VIEW_PRODUCTS,
          PermissionConst::CREATE_PRODUCTS,
          PermissionConst::UPDATE_PRODUCTS,
          PermissionConst::DELETE_PRODUCTS,
        ],
      ];

    // public const ADMIN_PERMISSIONS = [
    //     PermissionConst::VIEW_USERS,
    //     PermissionConst::CREATE_USERS,
    //     PermissionConst::UPDATE_USERS,
    //     PermissionConst::DELETE_USERS,
    //     PermissionConst::VIEW_PRODUCTS,
    //     PermissionConst::CREATE_PRODUCTS,
    //     PermissionConst::UPDATE_PRODUCTS,
    //     PermissionConst::DELETE_PRODUCTS,
    // ];

    // public const MANAGER_PERMISSIONS = [
    //     PermissionConst::VIEW_USERS,
    //     PermissionConst::VIEW_PRODUCTS,
    //     PermissionConst::CREATE_PRODUCTS,
    //     PermissionConst::UPDATE_PRODUCTS,
    //     PermissionConst::DELETE_PRODUCTS,
    // ];

    // public const EMPLOYEE_PERMISSIONS = [
    //     PermissionConst::VIEW_PRODUCTS,
    //     PermissionConst::CREATE_PRODUCTS,
    //     PermissionConst::UPDATE_PRODUCTS,
    //     PermissionConst::DELETE_PRODUCTS,
    // ];
}
