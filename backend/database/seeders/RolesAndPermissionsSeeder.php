<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Constants\PermissionConst;
use App\Constants\RoleConst;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $guardName = 'staff';
        Permission::create(['name' => PermissionConst::VIEW_USERS, 'guard_name' => $guardName]);
        Permission::create(['name' => PermissionConst::CREATE_USERS, 'guard_name' => $guardName]);
        Permission::create(['name' => PermissionConst::UPDATE_USERS, 'guard_name' => $guardName]);
        Permission::create(['name' => PermissionConst::DELETE_USERS, 'guard_name' => $guardName]);
        Permission::create(['name' => PermissionConst::VIEW_PRODUCTS, 'guard_name' => $guardName]);
        Permission::create(['name' => PermissionConst::CREATE_PRODUCTS, 'guard_name' => $guardName]);
        Permission::create(['name' => PermissionConst::UPDATE_PRODUCTS, 'guard_name' => $guardName]);
        Permission::create(['name' => PermissionConst::DELETE_PRODUCTS, 'guard_name' => $guardName]);

        $adminRole = Role::create([
          'name' => RoleConst::ADMIN_ROLE,
          'guard_name' => $guardName,
        ]);
        $managerRole = Role::create([
          'name' => RoleConst::MANAGER_ROLE,
          'guard_name' => $guardName,
        ]);
        $employeeRole = Role::create([
          'name' => RoleConst::EMPLOYEE_ROLE,
          'guard_name' => $guardName,
        ]);

        $adminRole->givePermissionTo(Permission::all());
        $managerRole->givePermissionTo(
          PermissionConst::VIEW_USERS,
          PermissionConst::VIEW_PRODUCTS,
          PermissionConst::CREATE_PRODUCTS,
          PermissionConst::UPDATE_PRODUCTS,
          PermissionConst::DELETE_PRODUCTS,
        );
        $employeeRole->givePermissionTo(
          PermissionConst::VIEW_USERS,
          PermissionConst::VIEW_PRODUCTS,
        );
    }
}
