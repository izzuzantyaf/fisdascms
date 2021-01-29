<div class="handout-section flex flex-col gap-4">
    <div class="flex items-center justify-between">
        <div class="handout-info">
            <div class="handout-title text-2xl font-semibold"><?= $faculty ?></div>
            <div class="handout-lang"><?= $lang === 'id' ? 'Bahasa Indonesia' : 'English' ?></div>
        </div>
        <div id="<?= $faculty . '-' . $lang . '-visibility' ?>" class="handout-visibility-toggler flex <?= $visibility ? 'bg-green-500 justify-end' : 'bg-gray-300' ?> rounded-full w-10 p-1 items-center gap-2 cursor-pointer">
            <input type="hidden" name="<?= $faculty . '-' . $lang . '-visibility' ?>" id="<?= $faculty . '-' . $lang . '-visibility' ?>" value="<?= $visibility ?>" />
            <div id="<?= $faculty . '-' . $lang . '-visibility' ?>" class="toggler-btn w-4 h-4 bg-white rounded-full"></div>
        </div>
    </div>
    <div class="handout-link-input flex border rounded-md">
        <input type="url" name="<?= $faculty . '-' . $lang . '-file_url' ?>" id="<?= $faculty . '-' . $lang . '-file_url' ?>" class="p-2 focus:ring-indigo-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 flex-grow rounded-l-md" placeholder="File url" value="<?= $file_url ?>" disabled>
        <div id="<?= $faculty . '-' . $lang . '-file_url' ?>" class="edit-icon rounded-r-md p-2 flex justify-center items-center bg-gray-50 hover:bg-gray-100 cursor-pointer">
            <i class="fas fa-pen text-gray-500"></i>
        </div>
    </div>
</div>