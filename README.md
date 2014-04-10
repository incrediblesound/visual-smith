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

b.algae<br>
c.mushrooms<br>
d.fish<br>
e.birds<br>
f.rodents<br>
g.cats<br>
h.humans<br>
\<CONNECT\><br>
a->d<br>
b->d<br>
d->e<br>
d->g<br>
e->g<br>
f->g<br>
a->h<br>
b->h<br>
c->h<br>
d->h<br>
e->h<br>
f->h<br>
