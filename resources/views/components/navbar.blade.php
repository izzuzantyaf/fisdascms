<nav class="bg-white">
    <div class="container mx-auto relative grid grid-cols-2 px-4 h-16">

        <!-- Mobile menu button-->
        <div class="flex items-center">
            <button class="hamburger-menu lg:hidden inline-flex items-center justify-center p-2 rounded-md text-blue-700 hover:text-white hover:bg-blue-700 text-2xl" aria-expanded="false">
                <i class="fas fa-bars"></i>
            </button>

            <a href="/">
                <img src="https://res.cloudinary.com/hxquybrtx/image/upload/v1613030969/logo/new_fisdas_logo_gipexs.png" alt="fisdas cms logo" class="hidden lg:inline-block w-10">
            </a>
        </div>

        <div class="flex gap-8 items-center justify-self-end">
            <div class="text-right hidden lg:inline-block text-blue-700">
                <div class="capitalize font-bold"><?= $logged_admin['name'] ?></div>
                <div><?= $logged_admin['username'] ?></div>
            </div>

            <div class="avatar bg-blue-800 flex items-center justify-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white h-10 w-10 text-white uppercase font-semibold cursor-pointer">
                <?php
                $array_name = explode(' ', $logged_admin['name']);
                $first_name = $array_name[0];
                echo count($array_name) > 1 ? $first_name[0] . $array_name[1][0] :  $first_name[0];
                ?>
            </div>

            <div class="profile-dropdown origin-top-right absolute right-4 mt-48 w-48 p-2 rounded-md shadow-md bg-white ring-1 ring-black ring-opacity-5 transition ease-in-out duration-200 transform scale-0" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                <a href="/admin-profile" class="flex gap-3 items-center rounded-md p-2 text-gray-700 hover:text-blue-700 hover:bg-blue-100" role="menuitem">
                    <i class="fas fa-user-circle"></i>
                    <span>Profil</span>
                </a>
                <a href="#" class="flex gap-3 items-center rounded-md p-2 text-gray-700 hover:text-blue-700 hover:bg-blue-100" role="menuitem">
                    <i class="fas fa-cog"></i>
                    <span>Pengaturan</span>
                </a>
                <a href="/logout" class="flex gap-3 ite-er rounded-md px-2 py-2 text-red-500 hover:bg-red-100" role="menuitem">
                    <i class="fas fa-sign-out-alt"></i>
                    <span>Keluar</span>
                </a>
            </div>
        </div>

    </div>
</nav>