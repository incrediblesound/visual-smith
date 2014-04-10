Visual-Smith
============
Visual-smith is an extension of my project wordsmith, which was my first attempt at using the fs module to read and write files. This time a simple compiler is added that allows user generated files to be compiled into data objects for D3 visualization. A selector is added on the main page for "Data Type" which allows the user to select bar graph or force directed graph visualization. This selector determines the file extension and the compiler used to parse the file contents. It is essential that the file contents match the syntax for the data type selected. Saved files appear on the right side of the main page with a button for editing and a button for opening the file and rendering its contents.

Bar Graph Syntax
----------------
Bar graph syntax is extremely simple, note the importance of line breaks between elements:

Cups 15<br>
Cars 20<br>
Cats 8<br>
Curves 5<br>

Force Graph Syntax
------------------
For a force directed graph there are two parts. The first part defines the ids and names of each node with simple dot notation. The second part, after \<CONNECT\>, defines the links between nodes according to their ids. Again, the importance of line breaks is stressed.

b.algae
c.mushrooms
d.fish
e.birds
f.rodents
g.cats
h.humans
<CONNECT>
a->d
b->d
d->e
d->g
e->g
f->g
a->h
b->h
c->h
d->h
e->h
f->h
