<div class="sidebar-overlay p-4 lg:p-0 z-10 w-0 lg:w-64 bg-black bg-opacity-0 lg:bg-opacity-0 flex-shrink-0 fixed inset-0 lg:mt-8 lg:relative transition transform duration-500 ease-in-out -translate-x-72 lg:translate-x-0 overflow-visible">
    <aside class="py-4 pr-4 w-64 h-full lg:h-auto text-gray-500 bg-white lg:shadow-xl rounded-lg overflow-y-auto">
        <div class="sidebar-header flex flex-col pl-6">
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
            ]) {
                $is_route_matched = $current_route === trim($route, '/'); ?>
                <a href="<?= $route ?>">
                    <div class="relative px-6 py-3 rounded-r-md inline-flex items-center w-full text-sm transition-colors duration-300 ease-in-out <?= $is_route_matched ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:bg-gray-100' ?>">
                        <?php if ($is_route_matched) { ?>
                            <span class="absolute inset-y-0 left-0 w-1 bg-blue-700 rounded-tr-lg rounded-br-lg" aria-hidden="true"></span>
                        <?php } ?>
                        <div class="menu-icon w-12">
                            <i class="<?= $icon ?> text-2xl"></i>
                        </div>
                        <span class="ml-4 <?= $is_route_matched ? 'font-bold' : 'font-medium' ?>"><?= $name ?></span>
                    </div>
                </a>
            <?php } ?>
        </div>
    </aside>
</div>