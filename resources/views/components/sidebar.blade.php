<aside class="sidebar z-20 w-64 overflow-y-auto bg-gray-50 lg:bg-gray-100 dark:bg-gray-800 flex-shrink-0 fixed top-0 bottom-0 lg:relative transition ease-in-out duration-500 transform -translate-x-72 lg:translate-x-0">
    <div class="py-4 pr-4 text-gray-500 dark:text-gray-400 lg:bg-white lg:rounded-lg lg:mt-8">
        <div class="sidebar-header flex flex-col pl-6 ">
            <div class="back-btn cursor-pointer lg:hidden self-end text-xl"><i class="fas fa-arrow-left"></i></div>
            <div class="text-2xl font-bold text-gray-800 dark:text-gray-200">
                Fisdas CMS
            </div>
        </div>

        <div class="menu-list mt-4">
            <?php foreach ($menu_list as [
                'route' => $route,
                'icon' => $icon,
                'name' => $name,
            ]) { ?>
                <a href="<?= $route ?>">
                    <div class="relative px-6 py-3 rounded-r-md inline-flex items-center w-full text-sm <?= $current_route === trim($route, '/') ? 'bg-blue-100 text-blue-700 hover:text-blue-700' : 'text-gray-500' ?> transition-colors duration-150 hover:text-blue-500 dark:hover:text-gray-200 dark:text-gray-100">
                        <?php if ($current_route === trim($route, '/')) { ?>
                            <span class="absolute inset-y-0 left-0 w-1 bg-blue-700 rounded-tr-lg rounded-br-lg" aria-hidden="true"></span>
                        <?php } ?>
                        <div class="menu-icon w-12">
                            <i class="<?= $icon ?> text-2xl"></i>
                        </div>
                        <span class="ml-4 font-medium"><?= $name ?></span>
                    </div>
                </a>
            <?php } ?>
        </div>

    </div>
</aside>