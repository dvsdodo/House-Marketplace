import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import ListingItem from '../components/ListingItem';

function Category() {
    const [listings, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [lastFetchListing, setLastFetchListing] = useState(null);
    const params = useParams();

    useEffect (() => {
        const fetchListings = async () => {
            try {
                const listingsRef = collection(db, "listings");
                const q = query(
                    listingsRef, 
                    where("type", "==", params.categoryName), 
                    orderBy("timestamp", "desc"), 
                    limit(10)
                );

                const querySnap = await getDocs(q);

                const lastVisible = querySnap.docs[querySnap.docs.length-1];
                setLastFetchListing(lastVisible);

                let listings = [];

                querySnap.forEach((doc) => {
                    return listings.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });

                setListing(listings);
                setLoading(false);

            } catch (error) {
                toast.error("Could not fetch listings")
            }
        }
        fetchListings();
    }, [params.categoryName]);

    const onFetchMoreListings = async () => {
        try {
          // Get reference
          const listingsRef = collection(db, 'listings')
    
          // Create a query
          const q = query(
            listingsRef,
            where('type', '==', params.categoryName),
            orderBy('timestamp', 'desc'),
            startAfter(lastFetchListing),
            limit(10)
          )
    
          // Execute query
          const querySnap = await getDocs(q)
    
          const lastVisible = querySnap.docs[querySnap.docs.length - 1]
          setLastFetchListing(lastVisible)
    
          const listings = []
    
          querySnap.forEach((doc) => {
            return listings.push({
              id: doc.id,
              data: doc.data(),
            })
          })
    
          setListing((prevState) => [...prevState, ...listings])
          setLoading(false)
        } catch (error) {
          toast.error('Could not fetch listings')
        }
      }

  return (
    <div className='category'>
        <header>
            <p className="pageHeader">
                {params.categoryName === "rent" ? "Places for Rent" : "Places for Sale"}
            </p>
        </header>

        {loading ? (
            <Spinner />
        ) : listings && listings.length > 0 ? (
            <>
                <main>
                    <ul className="categoryListings">
                        {listings.map((listing) => (
                            <ListingItem 
                                listing={listing.data}
                                id={listing.id}
                                key={listing.id}
                            />
                        ))}
                    </ul>
                </main>

                <br />
                <br />
                {lastFetchListing && (
                    <p className='loadMore' onClick={onFetchMoreListings}>
                    Load More
                    </p>
                )}
            </>
        ) : (
            <p>No listings for {params.categoryName}</p>
        )}
    </div>
  )
}

export default Category
