<script lang="ts">
  import { url } from "@sveltech/routify";
  import { getLocations, people } from "../../data";
  import type { Person } from "../../data";
  // import debounce from 'lodash.debounce';

  import CreatePerson from "./_create.svelte";

  let name: string;

  let locations = getLocations();

  // let locations = enumKeys(Location).map((s) => Location[s]);
  // console.log(locations);
  let selected_locations = locations.slice(0);

  function filterPeople(
    people: Person[],
    query: string,
    locations: string[]
  ): Person[] {
    let inLocation = people.filter((person) =>
      locations.includes(person.location)
    );
    if (query) {
      query = query.toLocaleLowerCase();
      return inLocation.filter(
        (person) =>
          person.name.includes(query) ||
          person.name_pinyin.includes(query) ||
          person.initials.includes(query)
      );
    } else {
      return inLocation;
    }
  }

  // const debouncedFilter = debounce(filterPeople, 1000);
  // $: filteredPeople = debouncedFilter(people, name, selected_locations);
  $: filteredPeople = filterPeople($people, name, selected_locations);
  let locationSelector: HTMLSelectElement;

  let newPerson: Person;
  let isCreatingPerson: boolean;
</script>

<style>
  aside {
    width: 30%;
    float: left;
    resize: horizontal;
    overflow: hidden; /* only to make 'resize' work */
    height: 100%;
    border-right-style: groove;
    padding: 0 1.5rem;
    min-width: max-content;
  }

  main {
    width: auto;
    overflow: auto;
    height: 100%;
    padding: 0 2rem;
  }

  .container {
    height: 100%;
  }

  input {
    margin: 0 5px;
  }

  select {
    display: block;
  }

  /* ul {
    list-style-type: none;
  } */

  table {
    width: 100%;
    border-collapse: collapse;
  }

  /* th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #b17c38;
    color: white;
  } */

  tr {
    margin: 8px 16px;
    border-bottom: 1px solid #ddd;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  tr:hover {
    background-color: #ddd;
  }

  td {
  border: 1px solid #ddd;
  padding: 8px;
}
</style>

<div class="container">

  <aside class="sidebar">
    <h2>Name Filter</h2>
    <hr />

    <input bind:value={name} type="text" class="nameinput" placeholder="Name" />

    <h3>Locations:</h3>

    <select
      multiple
      bind:value={selected_locations}
      bind:this={locationSelector}
      name="locations">
      {#each locations as location}
        <option value={location}>{location}</option>
      {/each}
    </select>

    <button
      on:click={() => {
        selected_locations = [...locations];
      }}>
      Select All
    </button>

    <button
      on:click={() => {
        isCreatingPerson = true;
      }}>
      Add Person
    </button>

  </aside>
  <main class="main">

    <h1>{filteredPeople.length} result(s) found</h1>
    <table>
      <tbody>
        {#each filteredPeople as person}
          <tr>
            <td>
              <a href={$url(`../${person.id}`)}>{person.name}</a>
            </td>
            <td>
              <a href={$url(`../records?person_id=${person.id}`)}>Records</a>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>

    <CreatePerson bind:person={newPerson} bind:open={isCreatingPerson} />
  </main>
</div>
