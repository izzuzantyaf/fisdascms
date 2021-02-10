<script type="text/javascript">
    const mediaLibrary = cloudinary.createMediaLibrary({
        cloud_name: 'hxquybrtx',
        api_key: '493334639281711',
        username: 'msi.fisdas@gmail.com',
        timestamp: Math.floor(Date.now() / 1000).toString(),
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
