<script>
  import { nodeTreeRoot } from '$lib/store.js';
  import { selectedNode } from '$lib/store.js';
  import {goto} from "$app/navigation";
  import Treenode from "$lib/Treenode.svelte";
  import AddNodeGroup from "$lib/AddNodeGroup.svelte";
  import AddNode from "$lib/AddNode.svelte";
  import RemoveNode from "$lib/RemoveNode.svelte";
  import RemoveNodeGroup from "$lib/RemoveNodeGroup.svelte";

  function onAddNodeGroupSuccess (event) {
    let nodeGroupMenuItems = [{'Name': 'Add Node ...', 'Event': 'addNode', 'EventCtx': {}}, 
                              {'Name': 'Remove Folder ...', 'Event': 'removeNodeGroup', 'EventCtx': {}} ];

    $nodeTreeRoot.children.push({
                                  Name: event.detail.Name, 
                                  children: [],
                                  expanded: false,
                                  MenuItems: nodeGroupMenuItems
                                });

    $selectedNode.Name = event.detail.Name;
    $selectedNode.ParentName = 'Traffic Nodes';
    $selectedNode.Type = 'NodeGroup';

    $nodeTreeRoot.expanded = true;

    $nodeTreeRoot.children = $nodeTreeRoot.children;
  }

  function onAddNode (event) {
    let nodeMenuItems = [{'Name': 'Remove Node ...', 'Event': 'removeNode', 'EventCtx': {}}];

    let nodeGroup = $nodeTreeRoot.children.find (ng => ng.Name==$selectedNode.Name);
    let urlPath = '/node/'+nodeGroup.Name+'/' + event.detail.Name

    nodeGroup.children.push({
                              Name: event.detail.Name,
                              UrlPath: urlPath,
                              UrlPathView: urlPath,
                              MenuItems: nodeMenuItems
                            });
    
    $selectedNode.Name = event.detail.Name;
    $selectedNode.ParentName = nodeGroup.Name;
    $selectedNode.Type = 'Node';

    nodeGroup.expanded = true;

    $nodeTreeRoot.children = $nodeTreeRoot.children;

    goto(urlPath);
  }

  function onRemoveNodeGroup (event) {

    $nodeTreeRoot.children = $nodeTreeRoot.children.filter(ng => ng.Name != $selectedNode.Name);

    $selectedNode.Name = 'Traffic Nodes';

    $nodeTreeRoot.children = $nodeTreeRoot.children;
  }
  
  function onRemoveNode (event) {

    let nodeGroup = $nodeTreeRoot.children.find (ng => ng.Name==$selectedNode.ParentName);

    nodeGroup.children = nodeGroup.children.filter(n => n.Name != $selectedNode.Name);
 
    $selectedNode.Name = nodeGroup.Name;
    $selectedNode.ParentName = 'Traffic Nodes';
    $selectedNode.Type = 'NodeGroup';

    $nodeTreeRoot.children = $nodeTreeRoot.children;
  }

  let showAddNodeGroup = false;
  let showAddNode = false;
  let showRemoveNode = false;
  let showRemoveNodeGroup = false;

</script>


<ul>
  <Treenode 
      node={$nodeTreeRoot}
      pnode={$nodeTreeRoot}
      level={1}
      type='NodeTreeRoot'
      on:expandToggle={() => $nodeTreeRoot.expanded = !$nodeTreeRoot.expanded}
      on:addNodeGroup={() => showAddNodeGroup = true}
    />

  {#if $nodeTreeRoot.expanded && $nodeTreeRoot.children}
    {#each $nodeTreeRoot.children as child}
        <Treenode 
          node={child}
          pnode={$nodeTreeRoot}
          level={2}
          type='NodeGroup'
          on:expandToggle={() => child.expanded = !child.expanded}
          on:addNode={() => showAddNode = true}
          on:removeNodeGroup={() => showRemoveNodeGroup = true}
          />

          {#if child.expanded && child.children}
            {#each child.children as grandChild}
              <Treenode 
                node={grandChild} 
                pnode={child} 
                level={3} 
                type='Node'
                on:removeNode={() => showRemoveNode = true}
                />
            {/each}
          {/if}

    {/each}
  {/if}
</ul>

<AddNodeGroup bind:isActive={showAddNodeGroup} 
    on:addNodeGroupSuccess={onAddNodeGroupSuccess}/>

<AddNode bind:isActive={showAddNode} 
  on:addNodeSuccess={onAddNode}/>

<RemoveNodeGroup bind:isActive={showRemoveNodeGroup} 
  on:removeNodeGroupSuccess={onRemoveNodeGroup}/>
  
<RemoveNode bind:isActive={showRemoveNode} 
  on:removeNodeSuccess={onRemoveNode}/>


<style>
    ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }
</style>