<script>

import { createEventDispatcher, beforeUpdate} from "svelte";


    import { selectedNode } from '$lib/store.js';
    import { profileTreeRoot } from '$lib/store.js';
    import { ProgressBar } from "carbon-components-svelte";
    
    import Textfield from '@smui/textfield';
    import HelperText from '@smui/textfield/helper-text';
    import Select, { Option } from '@smui/select';


    export let isActive;

    let Type;

    let Name;
    let nameError;
    let nameHelp;

    let ClientIface;
    let clientIfaceError;
    let clientIfaceHelp;

    let ServerIface;
    let serverIfaceError;
    let serverIfaceHelp;

    let isError;
    let errorMsg;
    let errorRows;
    let isProgress;

    let controller = null;
    let signal = null;

    function resetState() {
      Name = '';
      nameError = false;

      ClientIface = '';
      clientIfaceError = false;

      ServerIface = '';
      serverIfaceError = false;
      
      isError = false;
      isProgress = false;

      isActive=false;
    }

    resetState();   

    const dispatch = createEventDispatcher ();


    function validateName () {
      let nameRegex = new RegExp('^[a-z0-9]+$', 'i');
      let profileGroup = $profileTreeRoot.children.find (pg => $selectedNode.Name==pg.Name);

      if (Name.trim() == ''){
        nameHelp = 'required';
        nameError = true;
      } else if (!nameRegex.test(Name)){
        nameHelp = 'invalid - alphanumeric only';
        nameError = true;
      } else if (profileGroup.children.find (n => n.Name==Name)){
        nameHelp = 'already exist';
        nameError = true; 
      } else {
        nameHelp = '';
        nameError = false;
      }
    }

    function validateClientIface () {
      let clientIfaceRegex = new RegExp('^[a-z0-9]+:[a-z0-9]+$', 'i');

      if (ClientIface.trim() == ''){
        clientIfaceHelp = 'required';
        clientIfaceError = true;
      } else if (!clientIfaceRegex.test(ClientIface)){
        clientIfaceHelp = 'invalid - iface';
        clientIfaceError = true;
      } else {
        clientIfaceHelp = '';
        clientIfaceError = false;
      }
    }

    function validateServerIface () {
      let serverIfaceRegex = new RegExp('^[a-z0-9]+:[a-z0-9]+$', 'i');

      if (ServerIface.trim() == ''){
        serverIfaceHelp = 'required';
        serverIfaceError = true;
      } else if (!serverIfaceRegex.test(ServerIface)){
        serverIfaceHelp = 'invalid - iface';
        serverIfaceError = true;
      } else {
        serverIfaceHelp = '';
        serverIfaceError = false;
      }
    }

    function setErrorMsg(msg) {
      let lineRegex = new RegExp('\r?\n');

        errorMsg = msg;
        errorRows = (errorMsg.split(lineRegex)).length;
        if (errorRows == 0){
          errorRows = 1
        } else if (errorRows > 4){
          errorRows = 4;
        }
        isError = true;
    }

    async function onAddNodeCancel () {
      resetState ();

      if (controller) {
        controller.abort ();
      }
    }

    function validateFields() {
      validateName ();
      validateClientIface ();
      validateServerIface ();
    }

    async function onAddProfileOk () {

      validateFields ();

      if (!nameError && !clientIfaceError && !serverIfaceError) {

        controller = new AbortController();
        signal = controller.signal;

        try {
          errorMsg = '';
          isError = false;
          isProgress = true;
          const res = await fetch ('/api/profiles.json', {
            signal,
            method: 'POST',
            body: JSON.stringify({
              Name,
              Type : 'TlsClientServer',
              ClientIface,
              ServerIface,
              Group : $selectedNode.Name
            })
          });
          isProgress = false;

          if (res.ok) {
            const text = await res.text();
            let isJson = true;
            let json = {};
            try {
              json = JSON.parse (text);
            } catch (e) {
              isJson = false;
            }

            if (isJson) {
              if (json.status == 0){
                dispatch ('addProfileSuccess', {Name: Name});
                resetState();
              } else {
                console.log(json);
                setErrorMsg (json.message);
              }
            } else {
              isProgress = false;
              setErrorMsg (text); 
            }
          } else {
            console.log(res);
            setErrorMsg (JSON.stringify(res));
          }
        } catch (e) {
          isProgress = false;
          setErrorMsg (e.toString()); 
        }

      }
    }

    beforeUpdate ( async () => {
      validateFields();
    });

</script>

<div class="modal {isActive ? 'is-active' : ''}">
    <div class="modal-background"></div>
    <div class="modal-card box ">
      <header>
        <p class="modal-card-title ">New Profile</p>
      </header>
      <section class="modal-card-body">
        <div class="columns is-multiline is-mobile">

          <!-- <div class="column is-full">
            <div class="field">
              <div>
                <Select bind:value={Type} 
                  label="Type" 
                  style="width: 100%"
                  >
                  <Option value="TlsClientServer">TlsClientServer</Option>
                </Select>
              </div>
            </div>
          </div> -->
          
          
          <div class="column is-full">
            <div class="field">              
              <div class="control">
                <Textfield bind:value={Name} 
                  label="Name"
                  invalid={nameError}
                  on:input={validateName}
                  style="width: 100%"
                  >
                  <HelperText persistent slot="helper">{nameHelp}</HelperText>
                </Textfield>
              </div>
            </div>
          </div>


          <div class="column is-full">
            <div class="field">
              <div class="control">
                <Textfield bind:value={ClientIface} 
                  label="Client Iface"
                  invalid={clientIfaceError}
                  on:input={validateClientIface}
                  style="width: 100%"
                  >
                  <HelperText persistent slot="helper">{clientIfaceHelp}</HelperText>
                </Textfield>
              </div>
            </div>
          </div>
  
          <div class="column is-full">
            <div class="field">
              <div class="control">
                <Textfield bind:value={ServerIface} 
                  label="Server Iface"
                  invalid={serverIfaceError}
                  on:input={validateServerIface}
                  style="width: 100%"
                  >
                  <HelperText persistent slot="helper">{serverIfaceHelp}</HelperText>
                </Textfield>
              </div>
            </div>
          </div>
        </div>

        {#if isProgress}
          <div class="field">
            <div class="control">
              <ProgressBar helperText=""/>
            </div>
          </div>
        {/if}

        {#if isError}
          <div class="field">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label class="label">Error</label>
            <div class="control">
              <textarea class="textarea errmsg" placeholder="" rows="{errorRows}" value={errorMsg} readonly/>
            </div>
          </div>          
        {/if}

        <div class="field is-grouped">
          <div class="control">
            <button class="button  is-info" on:click={onAddProfileOk}>Add</button>
          </div>
          <div class="control">
            <button class="button  is-light" on:click={onAddNodeCancel}>Cancel</button>
          </div>
        </div>


      </section>
    </div>
</div>

<style>
  .errmsg {
    background-color: transparent;
    color: red;
    overflow: auto;
  }
</style>