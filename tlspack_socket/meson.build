openssl = dependency('openssl')
ev_socklib = shared_library('ev_sock'
                            , sources : [ 'ev_socket.cpp', 'ev_app.cpp']
                            , dependencies: [openssl]
                            , include_directories : []
                            , install_rpath : '/tlspack/lib'
                            , install_dir : '/code/Dockerbuild/bin'
                            , install : true)

