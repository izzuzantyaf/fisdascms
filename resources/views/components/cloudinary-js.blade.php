<script type="text/javascript">
    const mediaLibrary = cloudinary.createMediaLibrary({
        cloud_name: 'hxquybrtx',
        api_key: '493334639281711',
        username: 'msi.fisdas@gmail.com',
        timestamp: Date.now(),
        signature: document.querySelector('input.signature').value,
    }, {
        insertHandler: () => {},
        showHandler: () => {},
        hideHandler: () => {},
    })
    document.getElementById('cloudinary-ml').addEventListener('click', () => {
        mediaLibrary.show()
    })
</script>