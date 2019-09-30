id: 201909252133
title: Mac中在升级ruby版本后colorls命令报错的解决办法
date: 2019-09-25 21:33:53
categories: Mac
tags: [colorls,gem]
type: 4
---------
# 问题
为了在mac中使用tmuxinator，按照网上的教程使用rvm升级了系统的ruby版本，ruby升级完成后却发现执行colorls相关命令时，报了如下错误：

```bash
System/Library/Frameworks/Ruby.framework/Versions/2.3/usr/lib/ruby/2.3.0/rubygems/dependency.rb:319:in `to_specs': Could not find 'clocale' (>= 0) among 20 total gem(s) (Gem::LoadError)
Checked in 'GEM_PATH=/Users/em/.gem/ruby/2.3.0:/Library/Ruby/Gems/2.3.0:/System/Library/Frameworks/Ruby.framework/Versions/2.3/usr/lib/ruby/gems/2.3.0', execute `gem env` for more information
	from /System/Library/Frameworks/Ruby.framework/Versions/2.3/usr/lib/ruby/2.3.0/rubygems/specification.rb:1442:in `block in activate_dependencies'
	from /System/Library/Frameworks/Ruby.framework/Versions/2.3/usr/lib/ruby/2.3.0/rubygems/specification.rb:1431:in `each'
	from /System/Library/Frameworks/Ruby.framework/Versions/2.3/usr/lib/ruby/2.3.0/rubygems/specification.rb:1431:in `activate_dependencies'
	from /System/Library/Frameworks/Ruby.framework/Versions/2.3/usr/lib/ruby/2.3.0/rubygems/specification.rb:1413:in `activate'
	from /System/Library/Frameworks/Ruby.framework/Versions/2.3/usr/lib/ruby/2.3.0/rubygems.rb:196:in `rescue in try_activate'
	from /System/Library/Frameworks/Ruby.framework/Versions/2.3/usr/lib/ruby/2.3.0/rubygems.rb:193:in `try_activate'
	from /System/Library/Frameworks/Ruby.framework/Versions/2.3/usr/lib/ruby/2.3.0/rubygems/core_ext/kernel_require.rb:125:in `rescue in require'
	from /System/Library/Frameworks/Ruby.framework/Versions/2.3/usr/lib/ruby/2.3.0/rubygems/core_ext/kernel_require.rb:39:in `require'
	from /Library/Ruby/Gems/2.3.0/gems/colorls-1.1.1/exe/colorls:3:in `<top (required)>'
	from /usr/local/bin/colorls:22:in `load'
	from /usr/local/bin/colorls:22:in `<main>'
```
<!-- more -->

# 解决办法
在终端执行以下命令：
```bash
xcode-select --install
brew install rbenv
echo 'export PATH="/usr/local/opt/openssl/bin:$PATH"' >> ~/.zshrc
echo 'export LDFLAGS="-L/usr/local/opt/openssl/lib"' >> ~/.zshrc
echo 'export CPPFLAGS="-I/usr/local/opt/openssl/include"' >> ~/.zshrc
echo 'export PKG_CONFIG_PATH="/usr/local/opt/openssl/lib/pkgconfig"' >> ~/.zshrc
sudo gem pristine --all #that produced a permissions error, but i don't care everything worked
sudo gem install colorls
```
如果执行`xcode-select --install`时提示
```bash
xcode-select: error: command line tools are already installed, use "Software Update" to install updates
```
可以忽略。

# 参考
1. [https://github.com/avdv/clocale/issues/22](https://github.com/avdv/clocale/issues/22)