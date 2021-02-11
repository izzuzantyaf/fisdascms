<div class="handout-section col-span-full sm:col-span-6 flex flex-col gap-4">
    <div class="flex items-center justify-between">
        <div class="handout-info">
            <div class="handout-title text-2xl font-semibold"><?= $faculty ?></div>
            <div class="handout-lang"><?= $lang === 'id' ? 'Bahasa Indonesia' : 'English' ?></div>
        </div>
        <div id="<?= 'visibility-' . $id ?>" class="visibility-toggler flex <?= $visibility ? 'bg-green-500 justify-end' : 'bg-gray-300' ?> rounded-full w-10 p-1 items-center gap-2 cursor-pointer">
            <input type="hidden" name="<?= 'visibility-' . $id ?>" id="<?= 'visibility-' . $id ?>" value="<?= $visibility ?>" disabled />
            <div id="<?= 'visibility-' . $id ?>" class="toggler-btn w-4 h-4 bg-white rounded-full"></div>
        </div>
    </div>
    <div class="handout-link-input flex border rounded-md">
        <input type="url" name="<?= 'file_url-' . $id ?>" id="<?= 'file_url-' . $id ?>" class="p-2 focus:ring-indigo-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 flex-grow rounded-l-md" placeholder="File url" value="<?= $file_url ?>" disabled>
        <div id="<?= 'file_url-' . $id ?>" class="edit-icon rounded-r-md p-2 flex justify-center items-center bg-gray-50 hover:bg-gray-100 cursor-pointer">
            <i class="fas fa-pen text-gray-500"></i>
        </div>
    </div>
</div>