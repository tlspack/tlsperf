import os
import aiohttp
from aiohttp import web
import asyncio
import json
from pymongo import MongoClient
import yaml
import asyncssh

from config import *

from modules import TlsClientServer

class SshLinux():
    def __init__(self, ip, username, password):
        self.ip = ip
        self.username = username
        self.password = password
        self.log = []
   
    async def read_until(self, reader, msg_list):
        y = ''
        while True:
            y += await reader.read(1)
            if y == '':
                return ''
            for msg in msg_list:
                if y.endswith(msg):
                    self.log.append(y)
                    return msg
 
    def get_log(self):
        return ''.join(self.log)

    async def send_commamnd(self, command):
        async with asyncssh.connect(self.ip
                                    , username=self.username
                                    , password=self.password
                                    , known_hosts=None) as conn:
            _stdin, _stdout, _stderr = await conn.open_session(command)
            read_msg = await _stdout.read(-1)
            read_msg += await _stderr.read(-1)
            self.log.append(read_msg)
            return read_msg

stats_ticks = 60

async def api_get_node(request):
    group = request.query['group']
    name = request.query['name']

    mongoClient = MongoClient(DB_CSTRING)
    db = mongoClient[DB_NAME]
    node_col = db[NODE_LISTS]
    node = node_col.find_one({'Group': group, 'Name': name}, {'_id' : False})
    if not node:
        return web.json_response({'status' : -1, 'message': 'node not found'})
    return web.json_response({'status': 0, 'data': node})

async def api_get_nodes(request):
    # node_group = request.query['nodegroup']
    mongoClient = MongoClient(DB_CSTRING)
    db = mongoClient[DB_NAME]
    node_col = db[NODE_LISTS]
    nodes = node_col.find({}, {'_id' : False})
    if not nodes:
        return []
    return web.json_response(list(nodes))
    # node_items = v1Api.list_node().items
    # node_list= map(lambda n : {'Name' : n.metadata.name}, node_items)
    # return web.json_response(list(node_list))

async def api_add_node(request):
    try:
        r_text = await request.text()
        r_json = json.loads(r_text)

        mongoClient = MongoClient(DB_CSTRING)
        db = mongoClient[DB_NAME]
        node_col = db[NODE_LISTS]

        node = node_col.find_one({'Name': r_json['Name']
                                        , 'Group': r_json['Group']}
                                        , {'_id' : False})
        if node:
            return web.json_response({'status' : -1, 'message': 'already exist'})

        # sshLinux = SshLinux(r_json['SshIP']
        #                     , r_json['SshUser']
        #                     , r_json['SshUser'])

        try:
            # allIfaces = await asyncio.wait_for (sshLinux.send_commamnd ('ip a'), timeout=10.0)
            # print (allIfaces)
            node_col.insert_one(r_json)
            return web.json_response({'status' : 0})
        except asyncio.TimeoutError:
            return web.Response(text='ssh connection failed')
    except Exception as e:
        return web.Response(text=str(e))

async def api_delete_node(request):
    try:
        r_text = await request.text()
        r_json = json.loads(r_text)
        group = r_json['Group']
        name = r_json['Name']

        mongoClient = MongoClient(DB_CSTRING)
        db = mongoClient[DB_NAME]
        node_col = db[NODE_LISTS]

        # check if runnig?
        node_col.delete_one({'Group': group, 'Name': name})

        return web.json_response({'status' : 0})
    except Exception as e:
        return web.Response(text=str(e))

async def api_get_node_groups(request):
    mongoClient = MongoClient(DB_CSTRING)
    db = mongoClient[DB_NAME]
    node_group_col = db[NODE_GROUPS]
    node_groups = node_group_col.find({}, {'_id' : False})
    if not node_groups:
        return []
    return web.json_response(list(node_groups))

async def api_add_node_group(request):
    try:
        r_text = await request.text()
        r_json = json.loads(r_text)

        mongoClient = MongoClient(DB_CSTRING)
        db = mongoClient[DB_NAME]
        node_group_col = db[NODE_GROUPS]

        node = node_group_col.find_one({'Name': r_json['Name']}
                                        , {'_id' : False})
        if node:
            return web.json_response({'status' : -1, 'message': 'already exist'})
        
        node_group_col.insert_one(r_json) 
        return web.json_response({'status' : 0})
    except Exception as err:
        return web.json_response({'status' : -1, 'message': str(err)})

async def api_delete_node_group(request):
    try:
        r_text = await request.text()
        r_json = json.loads(r_text)
        name = r_json['Name']

        mongoClient = MongoClient(DB_CSTRING)
        db = mongoClient[DB_NAME]
        node_group_col = db[NODE_GROUPS]
        node_col = db[NODE_LISTS]
        nodes = node_col.find({}, {'_id' : False})
        if not nodes:
            nodes = []
        else:
            nodes = list(nodes)
        
        if list(filter(lambda a : a['Group'] == name,  nodes)):
            return web.json_response({'status' : -1, 'message': 'Folder not empty'})

        node_group_col.delete_one({'Name': name})
        return web.json_response({'status' : 0})
    except Exception as e:
        return web.Response(text=str(e))

async def api_get_profile(request):
    group = request.query['group']
    name = request.query['name']

    mongoClient = MongoClient(DB_CSTRING)
    db = mongoClient[DB_NAME]
    profile_col = db[PROFILE_LISTS]
    profile = profile_col.find_one({'Group': group, 'Name': name}, {'_id' : False})
    if not profile:
        return web.json_response({'status' : -1, 'message': 'profile not found'})
    return web.json_response({'status': 0, 'data': profile})

async def api_get_profiles(request):
    mongoClient = MongoClient(DB_CSTRING)
    db = mongoClient[DB_NAME]
    profile_col = db[PROFILE_LISTS]
    profiles = profile_col.find({}, {'_id' : False})
    if not profiles:
        return []
    return web.json_response(list(profiles))

async def api_add_profile(request):
    try:
        r_text = await request.text()
        r_json = json.loads(r_text)

        mongoClient = MongoClient(DB_CSTRING)
        db = mongoClient[DB_NAME]
        profile_col = db[PROFILE_LISTS]

        profile = profile_col.find_one({'Name': r_json['Name']
                                        , 'Group': r_json['Group']}
                                        , {'_id' : False})
        if profile:
            return web.json_response({'status' : -1, 'message': 'already exist'})

        TlsClientServer.set_profile_defaults(r_json)

        profile_col.insert_one(r_json) 
        return web.json_response({'status' : 0})
    except Exception as err:
        return web.json_response({'status' : -1, 'message': str(err)})

async def api_delete_profile(request):
    try:
        r_text = await request.text()
        r_json = json.loads(r_text)
        group = r_json['Group']
        name = r_json['Name']

        mongoClient = MongoClient(DB_CSTRING)
        db = mongoClient[DB_NAME]
        profile_col = db[PROFILE_LISTS]

        # check if running ??
        profile_col.delete_one({'Name': name, 'Group': group})

        return web.json_response({'status' : 0})
    except:
        return web.json_response({'status' : -1, 'message': 'tbd'})

async def api_get_profile_groups(request):
    mongoClient = MongoClient(DB_CSTRING)
    db = mongoClient[DB_NAME]
    profile_group_col = db[PROFILE_GROUPS]
    profile_groups = profile_group_col.find({}, {'_id' : False})
    if not profile_groups:
        return []
    return web.json_response(list(profile_groups))

async def api_add_profile_group(request):
    try:
        r_text = await request.text()
        r_json = json.loads(r_text)

        mongoClient = MongoClient(DB_CSTRING)
        db = mongoClient[DB_NAME]
        profile_group_col = db[PROFILE_GROUPS]

        profile = profile_group_col.find_one({'Name': r_json['Name']}
                                        , {'_id' : False})
        if profile:
            return web.json_response({'status' : -1, 'message': 'already exist'})

        profile_group_col.insert_one(r_json) 
        return web.json_response({'status' : 0})
    except Exception as err:
        return web.json_response({'status' : -1, 'message': str(err)})

async def api_delete_profile_group(request):
    try:
        r_text = await request.text()
        r_json = json.loads(r_text)
        name = r_json['Name']

        mongoClient = MongoClient(DB_CSTRING)
        db = mongoClient[DB_NAME]
        profile_group_col = db[PROFILE_GROUPS]
        profile_col = db[PROFILE_LISTS]
        profiles = profile_col.find({}, {'_id' : False})
        if not profiles:
            profiles = []
        else:
            profiles = list(profiles)

        if list(filter(lambda a : a['Group'] == name,  profiles)):
            return web.json_response({'status' : -1, 'message': 'Folder not empty'})

        profile_group_col.delete_one({'Name': name})
        return web.json_response({'status' : 0})
    except:
        return web.json_response({'status' : -1, 'message': 'tbd'})

async def api_get_profile_run(request):
    try:
        r_text = await request.text()
        r_json = json.loads(r_text)
        group = r_json['Group']
        name = r_json['Name']

        query = {'Group': group, 'Name': name}
        
        mongoClient = MongoClient(DB_CSTRING)
        db = mongoClient[DB_NAME]

        task_col = db[TASK_LISTS]
        task = task_col.find_one(query)

        if task:
            return web.json_response({'status' : 0, 'info': {'Status' : task['Status'], 'Events' : list(task['Events'])}})
        else:
            return web.json_response({'status' : -1, 'message': 'Not running'})
    except:
        return web.json_response({'status' : -1, 'message': 'tbd'})

async def api_start_profile_run(request):
    try:
        r_text = await request.text()
        r_json = json.loads(r_text)
        group = r_json['Group']
        name = r_json['Name']

        query = {'Group': group, 'Name': name}
        
        mongoClient = MongoClient(DB_CSTRING)
        db = mongoClient[DB_NAME]

        profile_col = db[PROFILE_LISTS]
        profile = profile_col.find_one(query)

        task_col = db[TASK_LISTS]
        task = task_col.find_one(query)

        if task:
            return web.json_response({'status' : -1, 'message': 'Already running'})
        if profile:
            task_col.insert_one({'Group': group, 'Name': name, 'Events': []})
            proc = await asyncio.create_subprocess_exec('python3',
                                                        './modules/TlsClientServer.py',
                                                         '--ops', 'start',
                                                         '--group', group,
                                                         '--name', name)
            await proc.wait()
            return web.json_response({'status' : 0, 'info': {'Status' : task['Status'], 'Events' : list(task['Events'])}})
        else:
            return web.json_response({'status' : -1, 'message': 'profile not found'})
    except:
        return web.json_response({'status' : -1, 'message': 'tbd'})

async def api_stop_profile_run(request):
    try:
        r_text = await request.text()
        r_json = json.loads(r_text)
        group = r_json['Group']
        name = r_json['Name']

        query = {'Group': group, 'Name': name}
        
        mongoClient = MongoClient(DB_CSTRING)
        db = mongoClient[DB_NAME]

        profile_col = db[PROFILE_LISTS]
        profile = profile_col.find_one(query)

        task_col = db[TASK_LISTS]
        task = task_col.find_one(query)

        if not task:
            return web.json_response({'status' : -1, 'message': 'Not running'})
        if profile:
            proc = await asyncio.create_subprocess_exec('python3',
                                                        './modules/TlsClientServer.py',
                                                         '--ops', 'stop',
                                                         '--group', group,
                                                         '--name', name)
            await proc.wait()
            return web.json_response({'status' : 0, 'info': {'Status' : task['Status'], 'Events' : list(task['Events'])}})
        else:
            return web.json_response({'status' : -1, 'message': 'profile not found'})
    except:
        return web.json_response({'status' : -1, 'message': 'tbd'})

async def api_get_stats(request):
    mongoClient = MongoClient(DB_CSTRING)
    db = mongoClient[DB_NAME]
    stats_col = db[REALTIME_STATS]
    appGId = request.match_info['appGId']
    gstats = stats_col.find_one ({'appGId' : appGId}, {'_id' : False})
    if not gstats:
        gstats = {}
    return web.json_response(gstats)

app = web.Application()

app.add_routes([web.route('get'
                            , '/api/node'
                            , api_get_node)])

app.add_routes([web.route('get'
                            , '/api/nodes'
                            , api_get_nodes)])

app.add_routes([web.route('post'
                            , '/api/nodes'
                            , api_add_node)])

app.add_routes([web.route('delete'
                            , '/api/nodes'
                            , api_delete_node)])

app.add_routes([web.route('get'
                            , '/api/node_groups'
                            , api_get_node_groups)])

app.add_routes([web.route('post'
                            , '/api/node_groups'
                            , api_add_node_group)])

app.add_routes([web.route('delete'
                            , '/api/node_groups'
                            , api_delete_node_group)])

app.add_routes([web.route('get'
                            , '/api/profile'
                            , api_get_profile)])

app.add_routes([web.route('get'
                            , '/api/profiles'
                            , api_get_profiles)])

app.add_routes([web.route('post'
                            , '/api/profiles'
                            , api_add_profile)])

app.add_routes([web.route('delete'
                            , '/api/profiles'
                            , api_delete_profile)])


app.add_routes([web.route('get'
                            , '/api/profile_groups'
                            , api_get_profile_groups)])

app.add_routes([web.route('post'
                            , '/api/profile_groups'
                            , api_add_profile_group)])

app.add_routes([web.route('delete'
                            , '/api/profile_groups'
                            , api_delete_profile_group)])

app.add_routes([web.route('get'
                            , '/api/profile_run'
                            , api_get_profile_run)])

app.add_routes([web.route('post'
                            , '/api/profile_run'
                            , api_start_profile_run)])

app.add_routes([web.route('delete'
                            , '/api/profile_run'
                            , api_stop_profile_run)])

# app.add_routes([web.route('post'
#                             , '/api/stop_run'
#                             , stop_run)])

# app.add_routes([web.route('get'
#                             , '/api/run'
#                             , get_run)])

app.add_routes([web.route('get'
                            , '/api/stats/{appGId:.*}'
                            , api_get_stats)])


class StatsListener:
    def connection_made(self, transport):
        self.transport = transport

    def datagram_received(self, data, addr):
        message = data.decode()
        stats = json.loads(message)
        appId = stats['appId']
        appGId = stats['appGId']

        del stats['appId']
        del stats['appGId']

        mongoClient = MongoClient(DB_CSTRING)
        db = mongoClient[DB_NAME]
        stats_col = db[REALTIME_STATS]

        gstats = stats_col.find_one ({'appGId' : appGId})
        if not gstats:
            gstats = {'appGId' : appGId,
                        'stats' : {'sum' : [stats], appId : [stats]}}
            stats_col.insert_one(gstats)
        else:
            if not gstats['stats'].get(appId):
                gstats['stats'][appId] = [stats]
            else:
                gstats['stats'][appId].append(stats)
                if len(gstats['stats'][appId]) > stats_ticks:
                    gstats['stats'][appId].pop(0)

            del gstats['stats']['sum']
            sum_stats_list = []
            for i in range (stats_ticks):
                sum_stats = {}
                for app_id, app_stats_list in gstats['stats'].items():
                    if i < len(app_stats_list):
                        app_stats = app_stats_list[i]
                        for k in app_stats.keys():
                            if not sum_stats.get(k):
                                sum_stats[k] = app_stats[k]
                            else:
                                sum_stats[k] = sum_stats[k]+ app_stats[k]
                sum_stats_list.append(sum_stats)
            gstats['stats']['sum'] = sum_stats_list
            stats_col.find_one_and_replace({'appGId' : appGId}, gstats)


def main ():
    global stats_ticks

    stats_ticks = int(os.environ.get('STATS_TICKS', '2'))

    loop = asyncio.get_event_loop()
    runner = aiohttp.web.AppRunner(app)
    loop.run_until_complete(runner.setup())
    site = aiohttp.web.TCPSite(runner
                , host=os.environ.get('HOST', '0.0.0.0')
                , port=int(os.environ.get('BPORT', '8887'))
                , reuse_port=True)
    loop.run_until_complete(site.start())

    listen = loop.create_datagram_endpoint(StatsListener
                    , local_addr=(os.environ.get('HOST', '0.0.0.0')
                                    , int(os.environ.get('SPORT', '7000')))
                    , reuse_port=True)

    loop.run_until_complete(listen)

    loop.run_forever()


if __name__ == '__main__':
    main()

