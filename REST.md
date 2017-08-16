# REST URI

This API will use the Verb (HTTP Methods) and Noun approach based on what [Roy Fielding](http://en.wikipedia.org/wiki/Roy_Fielding) meant for [The REST architecture](http://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm). The Nouns are either:

1. A Collection of things
2. A thing

One good naming convention is:

[POST or Create](To the *collection*)
sub.domain.tld/class_name.{media_type} 

[GET or Read](of *one* thing)
sub.domain.tld/class_name/id_value.{media_type}

[PUT or Update](of *one* thing)
sub.domain.tld/class_name/id_value.{media_type}

[DELETE](of *one* thing)
sub.domain.tld/class_name/id_value.{media_type}

[GET or Search](of a *collection*, FRIENDLY URL)
sub.domain.tld/class_name.{media_type}/{var}/{value}/{more-var-value-pairs}

[GET or Search](of a *collection*, Normal URL)
sub.domain.tld/class_name.{media_type}?var=value&more-var-value-pairs
Where {media_type} is one of: json, xml, rss, pdf, png, even html.

It is possible to distinguish the collection by adding an 's' at the end, like:

'users.json' *collection of things*
'user/id_value.json' *single thing*

This means you have to keep track of where you have put the 's' and where you haven't. 

Note half the planet (Asians for starters) speaks languages without explicit plurals so the URL is less friendly to them.
