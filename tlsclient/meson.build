incdirs = include_directories(['../tlspack_socket/'
                                , '../tlspack_app/'
                                , '../subprojects/'])

executable('tlsclient.exe'
            , sources : [ 'tlsclient_socket.cpp'
                            , 'tlsclient_app.cpp'
                            , 'tlsclient_main.cpp']
            , dependencies: [openssl, nlohmann_json_dep]
            , include_directories : [incdirs]
            , link_with : [ev_socklib, tlspack_applib]
            , build_rpath : '/tlspack/bin'
            , install_rpath : '/tlspack/bin'
            , install_dir : '/code/Dockerbuild/bin'
            , install : true)