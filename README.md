# Part 1

1) a url shortening system is a program which takes any url provided, and generates a smaller url that redirects the user to the same destination.

2) the main value of such system is providing the option to share links, which can be very long ("deep" endpoints, coded urls such as hebrew urls, etc.), in a shorter form, in places where use of hyperlinks is not possible\preferred. in case of a system that needs to save a big number of urls, shortening a url can also help save memory.

3)
- a shortening algorithm: can be a hash function, or allocating a pre determined url (for example, by ascending alphabetical order)  
- a database holding the pairs of urls (full and short).  
- a server that handles requests to either allocate a new url, or to redirect to a saved url

4)
- handling a growing amount of saved urls while maintaining fast responses for requests.  
- in case of using a hash function - handling cases of collision between short urls.

5)
 - allowing the users to chose their own shortened url.  
- working with commercial sites- when a user got to the site from a shortened url, the URL shortener site gets some sort of commission.  
- presenting the user with short urls she\he generated in the past (requires saving users and managing an authenticating system.

# Part 3  
two possible caching approaches-  
- over a period of time, computing what is the most read data, and keeping that data in the cache. If done correctly, and for some user behaviors, can maintain the data that is actually being read the most and provide a very useful cache system. However, can take considerable computing time for determining what data should be left in the cache, and what can be deleted.  
- automatically adding the newest data read in the cache, deleting the oldest data read. If some data that is already in the cache is being read, updating it as the newest data read. This approach can be faster than the first one, as it doesn’t require a more complex computations system. However, some users’ behavior patterns over longer period of times can be missed, not providing the ideal data needed.  
  
for the exercise I’ve chosen an approach that resembles the second one.
