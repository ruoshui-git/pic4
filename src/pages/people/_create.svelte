<script lang="ts">
  import Model from "./_model.svelte";
  // import {  } from "@smui/button";

  import type { Person } from "../../data";
  import { makePerson, getLocations, people } from "../../data";
  import debounce from "lodash.debounce";
  import Pinyin from "pinyin";

  let autosetInitials = true;
  let autosetPinyin = true;

  let locations = getLocations();

  export let open: boolean = false;

  const defaultPerson = () => makePerson("", "", "", "US");

  export let person = defaultPerson();
  let isAddingPerson = false;
  

  // TODO: Replace with some remote call 
  async function addPerson(person: Person) {
    // do some data validation
    $people = [...$people, person];
    return new Promise(resolve => setTimeout(resolve, 1000));
  }

  function getPinyin(name: string) {
    let pinyin: string[][] = Pinyin(name, {
      style: Pinyin.STYLE_NORMAL,
    });
    return pinyin.map((a) => a[0]).join(" ");
  }

  function setPinyin() {
    if (autosetPinyin) {
      const pinyin = getPinyin(person.name);
      person.name_pinyin = pinyin;
    }
  }

  function setInitials() {
    if (autosetInitials) {
      person.initials = person.name_pinyin
        .split(" ")
        .map((word) => word[0])
        .join("");
    }
  }
</script>

<style>
  input.nameinput {
    display: block;
  }
</style>

{#if open}

  <Model on:close={() => (open = false)}>
    <h1 slot='header'>Add a person</h1>

    <fieldset>
      <legend>Name:</legend>

      <input
        type="text"
        class="nameinput"
        bind:value={person.name}
        on:input={() => {
          setPinyin();
          setInitials();
        }}
        placeholder="Chinese Name" />

      <input
        type="text"
        bind:value={person.name_pinyin}
        on:input={setInitials}
        placeholder="Pinyin" />
      <label>
        <input type="checkbox" bind:checked={autosetPinyin} />
        Auto set
      </label>

      <input type="text" bind:value={person.initials} placeholder="Initials" />
      <label>
        <input type="checkbox" bind:checked={autosetInitials} />
        Auto set
      </label>

    </fieldset>
    <hr />
    <label>Location:
      <select bind:value={person.location}>
        {#each locations as location}
        <option value={location}>{location}</option>
        {/each}
      </select>
    </label>

    <button on:click={
      () => {
        isAddingPerson = true;
        addPerson(person).then(
          res => {
            person = defaultPerson();
            isAddingPerson = false;
            open = false;
          }
        )

      } 
    }>
      Add
    </button>
  </Model>
{/if}
