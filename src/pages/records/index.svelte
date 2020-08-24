<script lang="ts">
    import { params } from "@sveltech/routify";
    let person_id = $params.person_id;
</script>

{#if person_id}

{:else}

{/if}