
function to_save_img(title,url,t) {
    var html = '<html><head><title>' + title + '</title></head><body><div style="text-align:center" ><a download="' + t + '" href="' + url + '"><img title="点击下载博文图：' + title + '" src="' + url + '" /></a></div></body></html>';
    window.open().document.write(html);
}