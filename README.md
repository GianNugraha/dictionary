#Test Eigen

// link dokumentasi Postman //
https://documenter.getpostman.com/view/24551595/2s8Z76x9gP

// menu and authorization
a. login berdasarkan nama dan kode
b. monitoring member dan buku 
  1. Admin : Get All of List Member with sum of Books (borrow/loan) 
c. peminjaman (user/loan)
  1. loan/borrow
    - check validasi batas banyaknya pinjaman
    - check validasi buku yang di pinjam eksisting atau tidak nya
    - check validasi peminjam dalam masa hukuman atau tidak
    - fungsi get list peminjama buku berdasarkan user yang sedang login (untuk member)
    - validasi tidak bisa meminjam buku dengan id yang sama sekaligus
d. pengembalian/return
  1. return
    - check validasi pengembalian buku apakah sesuai/sebelum tanggal deadline
    - check validasi pengembalian buku apakah telat dari tanggal deadline
    - adanya fungsi hukuman pada saat pengembalian telat
    - validasi jika pengembalian buku dengan ID tertentu tidak ada
    
